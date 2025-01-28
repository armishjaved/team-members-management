from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import TeamMember
from .serializers import TeamMemberSerializer
from django.shortcuts import get_object_or_404



class TeamMemberViewSet(ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class TeamMemberDeleteView(APIView):
    #  Delete
    def delete(self, request, pk,*args, **kwargs):
        '''
        Deleting the TeamMemeber with given data
        '''
        team_member = get_object_or_404(TeamMember, pk=pk)
        team_member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TeamMemberUpdateView(APIView):
    #  Update
    def put(self, request, pk, *args, **kwargs):
        '''
        Updating the TeamMemeber with given data
        '''
        team_member = get_object_or_404(TeamMember, pk=pk)
        serializer = TeamMemberSerializer(team_member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
