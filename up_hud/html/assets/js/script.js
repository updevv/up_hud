$(document).ready(function() {
    $('.container-speedo').hide()
})

window.addEventListener('message', function(event) {
    const item = event.data
    
    if (item.action == "Speedo") {
        SetSpeedo(item.state, item.data)
    } else if (item.action == "HideHud") {
        if (item.state) {
            $("body").fadeOut()
        } else {
            $("body").fadeIn()
        }
    } else if (item.action == "SetStatus") {
        SetStatus(item.status, item.type)
    }
})

function SetStatus(status, type) {
    if (type == "health") {
        $('.progress-health-progress').css('width', `${status}%`)
    }
}

function SetSpeedo(state, data) {
    if (state) {
        SetFuel(data.fuel)
        SetSpeed(data.speed, data.maxspeed)
        
        if (data.key) {
            $(".dot-door").removeClass("dot-door-active")
            $(".dot-door").addClass("dot-door")
        } else {
            $(".dot-door").addClass("dot-door-active")
        }
        if (data.damage) {
            $(".dot-damage").removeClass("dot-damage-active")
            $(".dot-damage").addClass("dot-damage")
        } else {
            $(".dot-damage").addClass("dot-damage-active")
        }
        if (!data.engine) {
            $(".dot-engine").removeClass("dot-engine-active")
            $(".dot-engine").addClass("dot-engine")
        } else {
            $(".dot-engine").addClass("dot-engine-active")
        }
        if (!data.lights) {
            $(".dot-lights").removeClass("dot-lights-active")
            $(".dot-lights").addClass("dot-lights")
        } else {
            $(".dot-lights").addClass("dot-lights-active")
        }
        $(".container-speedo").fadeIn()
    } else {
        $(".container-speedo").fadeOut()
    }
} 


function SetSpeed(speed, maxspeed) {
    let firstChar = speed !== null && speed !== undefined ? speed.toString().charAt(0) : "0";
    let secondChar = speed !== null && speed !== undefined ? speed.toString().charAt(1) : "0";
    let thirdChar = speed !== null && speed !== undefined ? speed.toString().charAt(2) : "0";
    $(".first-letter-speed").text(firstChar);
    $(".second-letter-speed").text(secondChar);
    $(".third-letter-speed").text(thirdChar);
    $(".speed-progress").removeClass("speedo-progress-active").addClass("speedo-progress-inactive");
    $(".speed-progress-last").removeClass("speedo-progress-active").addClass("speedo-progress-inactive");

    if (speed !== null && speed !== undefined && maxspeed !== null && maxspeed !== undefined) {
        let numActiveBars = Math.ceil((speed / maxspeed) * 20);
        if (numActiveBars <= $(".speed-progress").length) {
            $(".speed-progress").slice(0, numActiveBars).removeClass("speedo-progress-inactive").addClass("speedo-progress-active");
        } else {
            $(".speed-progress").removeClass("speedo-progress-inactive").addClass("speedo-progress-active");
            $(".speed-progress-last").slice(0, numActiveBars - $(".speed-progress").length).removeClass("speedo-progress-inactive").addClass("speedo-progress-active");
        }
    }
}

function SetFuel(fuel) {
    $('.fuel-progress-progress').css('width', `${fuel}%`)
    $(".fuel-liters").text(fuel)
}