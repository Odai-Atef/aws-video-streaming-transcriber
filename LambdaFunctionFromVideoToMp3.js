const AWS = require('aws-sdk'),
    transcoder = new AWS.ElasticTranscoder({
        region: 'ap-south-1'
    });
const pipline_id="1568997268626-ngrxqq";
exports.handler = (event, context, callback) => {
    let fileName = event.Records[0].s3.object.key;
    var srcKey =  decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    var newKey = fileName.split('.')[0];
    transcoder.createJob({
         PipelineId: pipline_id,
         Input: {
            Key: srcKey
        },
        Output: {
            Key: getOutputName(fileName),
            ThumbnailPattern: '',
            PresetId: '1351620000001-300010',
            Rotate: 'auto'
        }
    }, function(err, data){
        if(err){
            console.log('Something went wrong:',err)
        }else{
            console.log('Converting is done');
        }
     callback(err,data);
    });
};
function getOutputName(srcKey){
 let baseName = srcKey.replace('outputvideosfromlive/','');
 let withOutExtension = removeExtension(baseName);
 return 'arabicvideosiptv/' + withOutExtension + '.mp3';
}
function removeExtension(srcKey){
    let lastDotPosition = srcKey.lastIndexOf(".");
    if (lastDotPosition === -1) return srcKey;
    else return srcKey.substr(0, lastDotPosition);
}
