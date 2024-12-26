import boto3
import os
import json

# Initialize AWS Rekognition client
rekognition = boto3.client('rekognition')

# Environment variables
s3_bucket = os.environ['BUCKET']
s3_folder = os.environ['FOLDER']

def lambda_handler(event, context):
    # Extract image name and operation from incoming event
    try:
        image_name = event['image_name']
        operation = event['operation']
    except KeyError as e:
        return {
            'statusCode': 400,
            'error': f'Missing parameter: {str(e)}'
        }
    
    image_path = f"s3://{s3_bucket}/{s3_folder}/{image_name}"
    
    try:
        if operation == 'object_detection':
            response = rekognition.detect_labels(
                Image={
                    'S3Object': {
                        'Bucket': s3_bucket,
                        'Name': f"{s3_folder}/{image_name}"
                    }
                }
            )
        elif operation == 'scene_detection':
            response = rekognition.detect_labels(
                Image={
                    'S3Object': {
                        'Bucket': s3_bucket,
                        'Name': f"{s3_folder}/{image_name}"
                    }
                },
                MaxLabels=10,
                MinConfidence=70
            )
        elif operation == 'facial_analysis':
            response = rekognition.detect_faces(
                Image={
                    'S3Object': {
                        'Bucket': s3_bucket,
                        'Name': f"{s3_folder}/{image_name}"
                    }
                }
            )
        elif operation == 'celebrity_recognition':
            response = rekognition.recognize_celebrities(
                Image={
                    'S3Object': {
                        'Bucket': s3_bucket,
                        'Name': f"{s3_folder}/{image_name}"
                    }
                }
            )
        elif operation == 'text_detection':
            response = rekognition.detect_text(
                Image={
                    'S3Object': {
                        'Bucket': s3_bucket,
                        'Name': f"{s3_folder}/{image_name}"
                    }
                }
            )
        else:
            return {
                'statusCode': 400,
                'error': 'Invalid operation requested'
            }
        
        return {
            'statusCode': 200,
            'response' : response
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'error': str(e)
        }
