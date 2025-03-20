local hudhidden = false

AddEventHandler("onClientResourceStart", function(resName)
    Wait(500)
end)

AddEventHandler("onClientResourceStop", function(resName)
    Wait(500)
end)
 
CreateThread(function()
    while true do 
        local player = PlayerPedId()
        local health = (GetEntityHealth(player) - 100)

        SendNUIMessage({action = "SetStatus", type = "health", status = health})

        if IsPauseMenuActive() or hudhidden then
            SendNUIMessage({action = "HideHud", state = true})
        else
            SendNUIMessage({action = "HideHud", state = false})
        end

        Wait(500)
    end
end)

CreateThread(function()
    while true do
        Wait(0)

        local ped = PlayerPedId()

        if IsPedInAnyVehicle(ped) then
            local vehicle = GetVehiclePedIsIn(ped, false)            
            local speed = math.ceil(GetEntitySpeed(vehicle) * 3.6)
            local fuel = adjust(GetVehicleFuelLevel(vehicle), 0)        
            local haslights, beam, highbeam  = GetVehicleLightsState(vehicle)
            local lights = false
            local driveable = IsVehicleDamaged(vehicle)

            if haslights and beam == 1 or highbeam == 1 then 
                lights = true
            end

            SendNUIMessage({
                action = "Speedo",
                state = true,
                data = {
                    speed = speed,
                    fuel = fuel,
                    engine = GetIsVehicleEngineRunning(vehicle),
                    key = GetVehicleDoorLockStatus(vehicle) == 2,
                    maxspeed = 360,
                    lights = lights,
                    damage = driveable
                },
            })
        else
            SendNUIMessage({action = "Speedo", state = false})
            Wait(500)
        end
    end
end)

function adjust(number, decimals)
    local power = 10 ^ decimals
    return math.floor(number * power) / power
end

RegisterCommand('hud', function ()
    hudhidden = not hudhidden
    if(hudhidden) then
        print("hud cachée")
    else
        print("hud visible")
    end
end, false)
exports("HideHud", function (state)
    hudhidden = state
end)

CreateThread(function()
    RequestStreamedTextureDict("updev", false)
    while not HasStreamedTextureDictLoaded("updev") do
      Wait(200)
    end
    AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "updev", "radarmasksm")
end)
