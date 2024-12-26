import json
import boto3
import os
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

def lambda_handler(event, context):
    textract = boto3.client('textract')
    s3_bucket = os.environ['BUCKET']
    s3_folder = os.environ['FOLDER']
    
    logger.info(f"Event: {event}")
    
    # Parse the incoming request
    try:
        body = event
        document_name = body['document_name']
        document_type = body['document_type'].lower()
        operation = body['operation'].lower()
    except KeyError as e:
        logger.error(f"Missing parameter: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Missing parameter: {str(e)}'})
        }
    
    document_s3_path = f"s3://{s3_bucket}/{s3_folder}/{document_name}"
    logger.info(f"Document S3 Path: {document_s3_path}")
    
    supported_operations = {
        'text': ['jpeg', 'png', 'pdf', 'tiff'],
        'forms': ['jpeg', 'png', 'pdf'],
        'tables': ['jpeg', 'png', 'pdf'],
        'handwriting': ['jpeg', 'png', 'pdf', 'tiff']
    }
    
    if document_type not in supported_operations.get(operation, []):
        error_message = f'{operation.capitalize()} operation is not supported for {document_type.upper()} documents'
        logger.error(error_message)
        return {
            'statusCode': 400,
            'error': error_message
        }

    try:
        # Start the asynchronous job
        if operation == 'text':
            response = textract.start_document_text_detection(
                DocumentLocation={'S3Object': {'Bucket': s3_bucket, 'Name': f"{s3_folder}/{document_name}"}}
            )
        elif operation == 'forms':
            response = textract.start_document_analysis(
                DocumentLocation={'S3Object': {'Bucket': s3_bucket, 'Name': f"{s3_folder}/{document_name}"}},
                FeatureTypes=['FORMS']
            )
        elif operation == 'tables':
            response = textract.start_document_analysis(
                DocumentLocation={'S3Object': {'Bucket': s3_bucket, 'Name': f"{s3_folder}/{document_name}"}},
                FeatureTypes=['TABLES']
            )
        elif operation == 'handwriting':
            response = textract.start_document_text_detection(
                DocumentLocation={'S3Object': {'Bucket': s3_bucket, 'Name': f"{s3_folder}/{document_name}"}}
            )
        else:
            logger.error("Invalid operation requested")
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid operation requested'})
            }
        
        job_id = response['JobId']
        logger.info(f"Started Textract job with ID: {job_id}")
        
        # Wait for the job to complete
        while True:
            if operation in ['text', 'handwriting']:
                status = textract.get_document_text_detection(JobId=job_id)
            else:
                status = textract.get_document_analysis(JobId=job_id)
                
            job_status = status['JobStatus']
            logger.info(f"Job status: {job_status}")
            
            if job_status in ['SUCCEEDED', 'FAILED']:
                break
            
            time.sleep(5)
        
        if job_status == 'SUCCEEDED':
            logger.info("Job succeeded")
            return {
                'statusCode': 200,
                 'status' : status
            }
        else:
            logger.error(f"Job failed with status: {job_status}")
            return {
                'statusCode': 500,
                'error': f"Job failed with status: {job_status}"
            }
    
    except boto3.exceptions.Boto3Error as e:
        logger.error(f"Boto3 error: {str(e)}")
        return {
            'statusCode': 500,
            'error': str(e)
        }
    except Exception as e:
        logger.error(f"General error: {str(e)}")
        return {
            'statusCode': 500,
            'error': str(e)
        }
