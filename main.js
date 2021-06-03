video = ""
status = ""
objects = []
function preload(){
    video = createVideo("video.mp4")
}
function setup(){
    canvas = createCanvas(480, 380)
    canvas.center()
    video.hide()
}
function start(){
    objectDetector = ml5.objectDetector('cocssd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}
function modelLoaded(){
    console.log("cocossd is initialized")
    status = true
    video.loop()
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video, 0, 0, 480, 380)
    if (status!= ""){
        objectDetector.detect(video, gotResult)
        for (i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status: object Detected"
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: "+objects.length
            fill("#FF0000")
            percent = floor(objects[i].confidence*100)
            text(objects[i].label +""+percent+"%", objects[i].x, objects[i].y)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
    }
    function gotResult(error, results){
if (error){
    console.log(error)
}
else{
    console.log(results)
    objects = results
}
}