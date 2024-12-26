import json
import boto3
import os

def lambda_handler(event, context):
    provider = event.get('Provider')
    service = event.get('Service')
    
    if not provider or not service:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Provider and Service must be specified'})
        }
    
    function_map = {
        'AWS': {
            'Translate': 'arn:aws:lambda:us-east-1:247477386084:function:TranslateService-LCS',
            'Textract': 'arn:aws:lambda:us-east-1:247477386084:function:TextTractService',
            'Rekognition': 'arn:aws:lambda:us-east-1:247477386084:function:RekognitionService',
            'Comprehend': 'arn:aws:lambda:us-east-1:247477386084:function:ComprehendService',
            'SST': 'arn:aws:lambda:us-east-1:247477386084:function:SSTService',
            'TTS': 'arn:aws:lambda:us-east-1:247477386084:function:TTSService'
        }
        # Add more providers and services as needed
    }
    
    if provider not in function_map or service not in function_map[provider]:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid Provider or Service'})
        }
    
    lambda_client = boto3.client('lambda')
    target_function_name = function_map[provider][service]
    
    try:
        response = lambda_client.invoke(
            FunctionName=target_function_name,
            InvocationType='RequestResponse',  # This makes the call synchronous
            Payload=json.dumps(event)
        )
        
        response_payload = json.loads(response['Payload'].read())
        
        return {
            'statusCode': 200,
            'response': response_payload
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
