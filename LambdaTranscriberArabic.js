const AWS = require('aws-sdk');
const LANGUAGE="ar-SA";
const FORMAT="mp3";
exports.handler =  (event) => {
    const bucket=event.Records[0].s3.bucket.name;
    const file_name=event.Records[0].s3.object.key;
    const recordUrl ="https:\/\/"+bucket+".s3.eu-central-1.amazonaws.com\/"+file_name;
    const TranscriptionJobName = file_name;
    const transcribeService=new AWS.TranscribeService();
    transcribeService.startTranscriptionJob({
      LanguageCode: LANGUAGE,
      Media: { MediaFileUri: recordUrl },
      MediaFormat: FORMAT,
      TranscriptionJobName,
      OutputBucketName: "transcriberoutputvideos"
    }, (err, data)=> {
            if (err){
                console.log(err); // an error occurred  
            }
    });
};
