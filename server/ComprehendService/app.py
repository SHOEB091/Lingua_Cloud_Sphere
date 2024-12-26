import json
import boto3
import os

def lambda_handler(event, context):
    comprehend = boto3.client('comprehend')
    
    # Parse the incoming request
    try:
        body = event
        text = body['text']
        operation = body['operation']
    except KeyError as e:
        return {
            'statusCode': 400,
            'error': f'Missing parameter: {str(e)}'
        }
    
    try:
        if operation == 'sentiment':
            response = comprehend.detect_sentiment(Text=text, LanguageCode='en')
        elif operation == 'entities':
            response = comprehend.detect_entities(Text=text, LanguageCode='en')
        elif operation == 'key_phrases':
            response = comprehend.detect_key_phrases(Text=text, LanguageCode='en')
        elif operation == 'language':
            response = comprehend.detect_dominant_language(Text=text)
        elif operation == 'syntax':
            response = comprehend.detect_syntax(Text=text, LanguageCode='en')
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
