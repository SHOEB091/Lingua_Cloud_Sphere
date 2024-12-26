import json
import boto3

def lambda_handler(event, context):
    translate = boto3.client('translate')
    
    body = event
    text = body['text']
    target_language = body['target_language']
    
    # Use AWS Translate to translate the text
    response = translate.translate_text(
        Text=text,
        SourceLanguageCode='auto',  
        TargetLanguageCode=target_language
    )
    
    translated_text = response['TranslatedText']
    
    # Return the translated text as a JSON response
    return {
        'statusCode': 200,
        'translated_text': translated_text
    }
