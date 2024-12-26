import json
import boto3
import uuid
import os

def lambda_handler(event, context):
    polly = boto3.client('polly')
    s3 = boto3.client('s3')
    
    bucket_name = os.environ['BUCKET']
    
    body = event
    text = body['text']
    voice_id = body.get('voice_id', 'Joanna')  # Default voice is Joanna
    
    response = polly.synthesize_speech(
        Text=text,
        OutputFormat='mp3',
        VoiceId=voice_id
    )
    
    audio_stream = response['AudioStream'].read()
    
    file_name = f"{uuid.uuid4()}.mp3"
    
    s3.put_object(
        Bucket=bucket_name,
        Key="TTSOutput/"+file_name,
        Body=audio_stream,
        ContentType='audio/mpeg'
    )
    
    file_url = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
    
    return {
        'statusCode': 200,
        'file_url': file_url
    }
