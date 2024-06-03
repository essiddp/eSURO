// Wheel

    var padding = {top: 20, right: 40, bottom: 20, left: 40},
        w = 500 - padding.left - padding.right,
        h = 500 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = -1,
        color = d3.scale.ordinal().range([
            '#D4070F',
            '#F18009',
            '#FFDA13',
            '#01D93F',
            '#0069C9',
            '#59009F',
        ]);
        
    var originalData = [];
    var data = originalData.slice(); // Create a copy to preserve the original data
    var svg = d3.select('#chart')
        .append("svg")
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);
    var container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
    var vis = container.append("g");
    var pie = d3.layout.pie().sort(null).value(function(d){ return 1; });
    var arc = d3.svg.arc().outerRadius(r);

    container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", r) // Set the radius to match the wheel radius
        .style("fill", "none")
        .style("stroke", "#ffffff") // Set the border color
        .style("stroke-width", "10px"); // Set the border width
    // Function to update the wheel
    function updateWheel() {
        var arcs = vis.selectAll("g.slice")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "slice");

        arcs.append("path")
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", function (d) { return arc(d); });

        arcs.append("text")
            .attr("transform", function(d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
            })
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .text(function(d, i) { return data[i]; });
    }

    // Initial creation of the wheel
    updateWheel();

    container.on("click", spin);
    

    function spin() {
        if (data.length === 0) {
            return; // Exit the function if there are no inputs
        }

        // Store the input text content before disabling
        var inputText = document.getElementById("inputText").value;
        
        container.on("click", null);
    
        var ps = 360 / data.length,
            rng = Math.floor((Math.random() * 1440) + 360);
    
        // Calculate the new rotation angle based on current state
        oldrotation = rotation;
        rotation = (Math.round(rng / ps) * ps);
        picked = Math.round(data.length - (rotation % 360) / ps);
        picked = picked >= data.length ? (picked % data.length) : picked;
        rotation += 3000 - Math.round(ps / 2);
    
        // Calculate the duration dynamically based on data length
        var duration = 10800; // Adjust this factor as needed
        
        // Animate the rotation from oldrotation to new rotation
        vis.transition()
            .duration(duration)
            .attrTween("transform", rotTween)
            .each("end", function() {
                // Restore the input text content
                document.getElementById("inputText").value = inputText;
                
                oldpick = picked;
                showPopup(data[picked]);
                
                // Update oldrotation to current rotation after spin completes
                oldrotation = rotation;
                
                // Re-enable click event after spin completes
                container.on("click", spin);
            });

        setTimeout(spinSound, 0);
    }

    function spinSound() {
        const audio = document.getElementById('wheelspin');
        audio.play();
        const music = document.getElementById('music');
        music.pause();
        setTimeout(replayMusic, 11100);
    }
    
    function replayMusic() {
        const music = document.getElementById('music');
        music.play();
    }
  
    svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"#ffffff"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"#ffffff","cursor":"pointer"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px", "font-color":"white", "cursor":"pointer"});
        
        

    function rotTween(to) {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function(t) {
            return "rotate(" + i(t) + ")";
        };
    }

    // Define the submit button click event
    document.getElementById("submitBtn").addEventListener("click", function() {
        // Get the input text area
        var inputTextArea = document.getElementById("inputText");
        // Get the value from the text area
        var newInput = inputTextArea.value;
        // Check if the new input is not empty
        if (newInput !== '') {
            // Split the input by lines
            var newChoices = newInput.split('\n');
            // Process the new choices
            processInput(newChoices);
        }
    });

    function processInput(newChoices) {
        // Clear the data array
        data = [];
        // Trim and add each input directly to the data
        newChoices.forEach(function(d) {
            var trimmed = d.trim();
            if (trimmed !== '') {
                data.push(trimmed);
            }
        });
        // Remove existing slices
        vis.selectAll(".slice").remove();
        // Update the wheel with the new data
        updateWheel();
    }

    function showPopup(option) {
        var popupText = document.getElementById("popupText");
        popupText.textContent = option;
        document.getElementById("popupOverlay").style.display = "block";
        document.getElementById("popupWindow").style.display = "block";
    }

    // Hide the custom popup window
    function hidePopup() {
        document.getElementById("popupOverlay").style.display = "none";
        document.getElementById("popupWindow").style.display = "none";
    }

    // Define the remove button click event
    document.getElementById("removeBtn").addEventListener("click", function() {
        data.splice(picked, 1);
        // Remove existing slices
        vis.selectAll(".slice").remove();
        // Update the wheel with the new data
        updateWheel();
        hidePopup();
        container.on("click", spin);
    });

    // Define the keep button click event
    document.getElementById("keepBtn").addEventListener("click", function() {
        hidePopup();
        container.on("click", spin);
    });

    document.getElementById("clrBtn").addEventListener("click", function() {
        hidePopup();
        // Reset data to empty array
        data = [];
        document.getElementById("inputText").value = '';
        // Update the wheel
        updateWheel();
    });