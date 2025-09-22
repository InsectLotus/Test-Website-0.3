
        function updateGreeting() {
            const now = new Date();
            const hours = now.getHours();
            let greeting = "";
            
            if (hours < 12) {
               greeting = "Good Morning!";
            } else if (hours < 18) {
               greeting = "Hello!"; 
            } else {
               greetin = "Good Evening!";
            }

            document.getElementById("greeting").textContent =
                greeting + " it is " + now.toLocaleTimeString();
        }

        updateGreeting();
        setInterval(updateGreeting, 1000);
