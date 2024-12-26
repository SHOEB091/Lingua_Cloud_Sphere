import json
import boto3
import time
import os
import logging
import urllib.request

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    transcribe = boto3.client('transcribe')
    s3 = boto3.client('s3')
    
    # Log event details
    logger.info("Event: %s", event)
    
    
    body = event
    bucket_name = os.environ['BUCKET']
    folder_name = os.environ['FOLDER']
    file_name = body['file_name']
    job_name = f"transcription_{int(time.time())}"
    
    try:
        # Start the transcription job
        transcribe.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': f's3://{bucket_name}/{folder_name}/{file_name}'},
            MediaFormat='mp3',
            LanguageCode='en-US'
        )
    except Exception as e:
        logger.error("Error starting transcription job: %s", str(e))
        return {
            'statusCode': 500,
            'error': 'Failed to start transcription job'
        }
    
    # Wait for the transcription job to complete
    while True:
        status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
        if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
            break
        time.sleep(5)
    
    if status['TranscriptionJob']['TranscriptionJobStatus'] == 'COMPLETED':
        transcript_uri = status['TranscriptionJob']['Transcript']['TranscriptFileUri']
        logger.info("Transcript URI: %s", transcript_uri)
        
        try:
            # Retrieve the transcription result directly from the pre-signed URL
            with urllib.request.urlopen(transcript_uri) as response:
                transcript_content = response.read().decode('utf-8')
                transcript_text = json.loads(transcript_content)['results']['transcripts'][0]['transcript']
        except Exception as e:
            logger.error("Error retrieving transcript from URI: %s", str(e))
            return {
                'statusCode': 500,
                'error': 'Failed to retrieve transcript'
            }
        
        # Return the transcribed text as a JSON response
        return {
            'statusCode': 200,
            'transcript_text': transcript_text
        }
    else:
        return {
            'statusCode': 500,
            'error' : 'error'
        }
