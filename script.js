const Local_Host = 3000;//local host


$(document).ready(() => {
    let vehiclelist;

    $.get(`http://localhost:${Local_Host}/posts`, data => {//placing local host into get http. 
        vehiclelist = data
    })
    .done(() => vehicleList())

    const vehicleList = () => {
        $('#content').empty()
        vehiclelist.forEach(vehicle => {
            $('#content').append(
                `<div id="vehicle${vehicle.id}" class ="info-box">
                ID: ${vehicle.id},
                Year: ${vehicle.year},
                Mileage: ${vehicle.mileage}, 
                Make: ${vehicle.make}, 
                Model: ${vehicle.model}
                <button id=${vehicle.id} class="btn btn-danger btn-sm">Delete</button><hr>
                </div>`
            )
            $(`#${vehicle.id}`).click(() => removeItem(vehicle.id))//listener to respond and delete when clicked on. 
        })
    }

    const removeItem = id => {
        $.ajax({
            url: `http://localhost:${Local_Host}/posts/${id}`,
            type: 'Delete',
            success: function() {
                vehicleList()
            } 
        })

        alert(`vehicle with id of ${id} was deleted`)//message will appear when choosen to delete. 

    }


    $('#myForm').submit(event => {//Form
        event.preventDefault()
        console.log("submit request recieved")
        console.log($('#year').val())
        const formData = {
            year: $('#year').val(),
            mileage: $('#mileage').val(),
            make: $('#make').val(),
            model: $('#model').val()
        }

        $.post(`http://localhost:${Local_Host}/posts`,JSON.stringify(formData))
            //data => {alert(`data added: Year: ${formData.year}, Mileage: ${formData.mileage}, Make: ${formData.make}, Model: ${formData.model}`)}
        
        
        $('#myForm').trigger('reset')
        vehicleList()
    })

    $('#myUpdateForm').submit(event => {//Update Form
        event.preventDefault()
        const formData = {
            id: $('#updateId').val(),
            year: $('#updateYear').val(),
            mileage: $('#updateMileage').val(),
            make: $('#updateMake').val(),
            model: $('#updateModel').val()
        }

        $.ajax({//for Puts or Deletes we use ajax method to pass in object, url 
            url: `http://localhost:${Local_Host}/posts/${formData.id}`,//` back ticks put in the variable. 
            type: 'PUT',
            contentType: 'application/json',//turn our data into json
            ///this put the data into strings for the json file
            data: JSON.stringify(formData)//turn object into json
        })
        //Trigger the function and build the list again
        .done(() => vehicleList())
        //Clears the update form
        $('#myUpdateForm').trigger('reset') 
    })

})












    
