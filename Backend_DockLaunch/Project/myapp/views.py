from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Deployment
from .deployment_manager import DeploymentManager
import logging
import docker

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class DeployView(APIView):
    def post(self, request):
        try:
            repo_url = request.data.get('repo_url')
            if not repo_url:
                return Response(
                    {'error': 'repo_url is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                deployment_manager = DeploymentManager()
                deployment_data = deployment_manager.deploy_repository(repo_url)
                
                # Save deployment to database
                deployment = Deployment.objects.create(
                    repo_url=repo_url,
                    container_id=deployment_data['container_id'],
                    ngrok_url=deployment_data['ngrok_url']
                )
                
                return Response(deployment_data, status=status.HTTP_201_CREATED)
            except docker.errors.APIError as e:
                logger.error(f"Docker API Error: {str(e)}")
                return Response(
                    {'error': 'Docker daemon error. Please ensure Docker is running and you have the necessary permissions.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            except Exception as e:
                logger.error(f"Error in deployment: {str(e)}")
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except Exception as e:
            logger.error(f"Unexpected error in deployment: {str(e)}")
            return Response(
                {'error': 'An unexpected error occurred'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@method_decorator(csrf_exempt, name='dispatch')
class StopView(APIView):
    def post(self, request):
        try:
            container_id = request.data.get('container_id')
            repo_url = request.data.get('repo_url')
            
            if not container_id and not repo_url:
                return Response(
                    {'error': 'Either container_id or repo_url is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                deployment_manager = DeploymentManager()
                deployment_manager.stop_deployment(container_id, repo_url)
                
                # Delete deployment from database
                if container_id:
                    Deployment.objects.filter(container_id=container_id).delete()
                elif repo_url:
                    Deployment.objects.filter(repo_url=repo_url).delete()
                
                return Response(
                    {'message': 'Deployment stopped successfully'},
                    status=status.HTTP_200_OK
                )
            except docker.errors.APIError as e:
                logger.error(f"Docker API Error: {str(e)}")
                return Response(
                    {'error': 'Docker daemon error. Please ensure Docker is running and you have the necessary permissions.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            except Exception as e:
                logger.error(f"Error stopping deployment: {str(e)}")
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except Exception as e:
            logger.error(f"Unexpected error in stop deployment: {str(e)}")
            return Response(
                {'error': 'An unexpected error occurred'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
