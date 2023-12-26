document.addEventListener('DOMContentLoaded', () => {
    //TODO: Follow JS convestions and change const variables to upper case 

    let pause = false;


    //start button 
    const START = document.getElementById('startButton');
    const PAUSEPLAYBUTTON = document.querySelector('.pausePlayButton');
    const ICON = document.querySelector('.bi');
    const initalBars= 10;
    let BARCONTAINER = document.querySelector('.barContainer');

    //slider display num bars 
    let slider = document.querySelector('.slider');
    let numberOutput = document.querySelector('.barsInSlider');
    numberOutput.innerHTML = slider.value;

    slider.oninput = function() {
        numberOutput.innerHTML = this.value;
    }

    slider.addEventListener('input', (event) => {
        let userNumber = event.target.value;
        BARCONTAINER.replaceChildren();
        for (let i = 0; i < userNumber; i++) {
            console.log(userNumber);
            
            // Create a bar
            const bar = document.createElement('div');
    
            // Generate a random height between 20 and 200 pixels
            const randomHeight = returnRandomHeight();
            
            // Set the height and assign the 'bar' class
            bar.style.height = `${randomHeight}px`;
            bar.className = 'bar';
    
            // Append the div to the container
            BARCONTAINER.appendChild(bar);
        }
        console.log(userNumber);
    });

    //Generate random height in a range 
    function returnRandomHeight() {
        return Math.floor(Math.random() * 200);
    }

    // Bubble Sort algorithm for sorting the bars
    async function bubbleSort() {
        const bars = document.querySelectorAll(".bar");
        const n = bars.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                const bar1 = bars[j];
                const bar2 = bars[j + 1];

                // indicate comparison of two bars by 
                bar1.classList.add('comparing');
                bar2.classList.add('comparing');

                // Wait briefly to visualize the comparison
                await new Promise(resolve => setTimeout(resolve, 100));

                //pause execution if user pressed pause button 
                if (pause){
                    while (pause) {
                        bar1.classList.add('comparing');
                        bar2.classList.add('comparing');
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
                
                //parse the string representation of height in base 10 
                const height1 = parseInt(bar1.style.height, 10);
                const height2 = parseInt(bar2.style.height, 10);

                if (height1 > height2) {
                    // Swap the heights of the two bars
                    //NOTE: type conversion happens here in js where ints are converted to a string 
                    bar1.style.height = height2 + "px";
                    bar2.style.height = height1 + "px";
                    bar1.classList.remove('comparing');
                    bar2.classList.remove('comparing');
                    bar1.classList.add('swapped');
                    bar2.classList.add('swapped');
                }
                else {
                    bar1.classList.remove('comparing');
                    bar2.classList.remove('comparing');
                }

                // Wait briefly to visualize the swap
                await new Promise(resolve => setTimeout(resolve, 100));

                // Remove "swapped" class
                bar1.classList.remove('swapped');
                bar2.classList.remove('swapped');
            }
        }
    }

    async function selectionSort() {
        const bars = document.querySelectorAll('.bar');
        const n = bars.length; 

        for (let i = 0; i < n; i++) {
            /*wihtout this, the last bar will not flash green to indicate the last swap. that is because we never touch the inner loop that shows the swap, we only flash it red from the other loop 
            */
            if (i == n - 1) {
                let lastBar = bars[i];
                lastBar.classList.add('comparing');
                await new Promise(resolve => setTimeout(resolve, 100));
                lastBar.classList.remove('comparing');
                await new Promise(resolve => setTimeout(resolve, 100));

                lastBar.classList.add('swapped');
                await new Promise(resolve => setTimeout(resolve, 100));
                lastBar.classList.remove('swapped');
                await new Promise(resolve => setTimeout(resolve, 100));
                continue;
            }
            let currMin = bars[i];

            //pause execution if user pressed pause button 
            if (pause){
                while (pause) {
                    currMin.classList.add('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            currMin.classList.add('comparing');
            await new Promise(resolve => setTimeout(resolve, 100));
            currMin.classList.remove('comparing');
            await new Promise(resolve => setTimeout(resolve, 100));
            //changed from j=i+1 to j = i in order to make the first bar flash red when i == 0 in outer loop 
            for (let j = i + 1; j < n; j++) {
                let currBar = bars[j];

                if (pause){
                    while (pause) {
                        currBar.classList.add('comparing');
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
                const minHeight = parseInt(currMin.style.height, 10);
                const currHeight = parseInt(currBar.style.height, 10);
                
                if (currHeight < minHeight && j == n - 1) {
        
                    currBar.classList.add('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    currBar.classList.remove('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));

                    let leftPosition = bars[i];
                    let leftPositionHeight = parseInt(leftPosition.style.height, 10);
                    let currBarHeight = parseInt(currBar.style.height, 10);
                    leftPosition.style.height =  currBarHeight+ 'px';
                    currBar.style.height = leftPositionHeight + 'px';
                    leftPosition.classList.add('swapped');
                    currBar.classList.add('swapped');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    leftPosition.classList.remove('swapped');
                    currBar.classList.remove('swapped');
                    continue;
                }
                //visualize finding a new min in unsorted partition by flashing it red and continuing to other comparisons until we find a new min again 
                if (currHeight < minHeight) {
                    
                    currMin = bars[j];
                    currMin.classList.add('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    currMin.classList.remove('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    continue;
                }

                //indicate the current item in unsorted portion being compared to the minimun 
                currBar.classList.add('comparing');
                await new Promise(resolve => setTimeout(resolve, 100));
                currBar.classList.remove('comparing');
                await new Promise(resolve => setTimeout(resolve, 100));

                //indicate the current minimun in the unsorted portion 
                currMin.classList.add('comparing');
                await new Promise(resolve => setTimeout(resolve, 100));
                currMin.classList.remove('comparing');
                await new Promise(resolve => setTimeout(resolve, 100));
                
                //At last iteration, we want to swap the bar at position i with the minimun height bar in unsorted partition 
                //min height not being swapped at i 
                if (j == n - 1) {
                   
                    let leftPosition = bars[i];
                    let leftPositionHeight = parseInt(leftPosition.style.height, 10);
                    leftPosition.style.height = minHeight + 'px';
                    currMin.style.height = leftPositionHeight + 'px';
                    leftPosition.classList.add('swapped');
                    currMin.classList.add('swapped');
                    await new Promise(resolve => setTimeout(resolve, 100));

                    leftPosition.classList.remove('swapped');
                    currMin.classList.remove('swapped');
                }
            }
        }
    }
    //still thinking maybe the missing px on line 164 could be an issue
    //still thinking about why creatine new elements solved it 
    async function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        
        const mid = Math.floor(arr.length / 2);
        const left = await mergeSort(arr.slice(0, mid));
        const right = await mergeSort(arr.slice(mid));
        const sortedArr = await merge(left, right);
        //console.log(sortedArr.map(bar => parseInt(bar.style.height, 10)));

        // Animate the swapping in the original array
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.height = `${sortedArr[i].style.height}`;
            arr[i].classList.add('swapped');
            if (pause){
                while (pause) {
                    arr[i].classList.add('swapped');
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            arr[i].classList.remove('swapped');
        }

        return arr;
    }
    
    async function merge(arr1, arr2) {
        const mergedArr = [];
        let i = 0;
        let j = 0;
    
        while (i < arr1.length && j < arr2.length) {
            arr1[i].classList.add('comparing');
            arr2[j].classList.add('comparing');
            await new Promise(resolve => setTimeout(resolve, 100));
            if (pause){
                while (pause) {
                    arr1[i].classList.add('comparing');
                    arr2[j].classList.add('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            arr1[i].classList.remove('comparing');
            arr2[j].classList.remove('comparing');
            await new Promise(resolve => setTimeout(resolve, 100));

            
    
            if (parseInt(arr1[i].style.height) < parseInt(arr2[j].style.height)) {
                // Ensure you create a new bar element and set its height
                const newBar = document.createElement('div');
                newBar.style.height = arr1[i].style.height;
                newBar.className = 'bar';
                mergedArr.push(newBar);
                i++;
            } else {
                // Ensure you create a new bar element and set its height
                const newBar = document.createElement('div');
                newBar.style.height = arr2[j].style.height;
                newBar.className = 'bar';
                mergedArr.push(newBar);
                j++;
            }
        }
    
        while (i < arr1.length) {
            if (pause){
                while (pause) {
                    arr1[i].classList.add('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            const newBar = document.createElement('div');
            newBar.style.height = arr1[i].style.height;
            newBar.className = 'bar';
            mergedArr.push(newBar);
            i++;
        }
    
        while (j < arr2.length) {
            if (pause){
                while (pause) {
                    arr2[j].classList.add('comparing');
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            const newBar = document.createElement('div');
            newBar.style.height = arr2[j].style.height;
            newBar.className = 'bar';
            mergedArr.push(newBar);
            j++;
        }
    
        return mergedArr;
    }

    //generate 100 bars upon loading main site 
    for (let i = 0; i < initalBars; i++) {
        // Create a bar
        const bar = document.createElement('div');

        // Generate a random height between 20 and 200 pixels
        const randomHeight = returnRandomHeight();
        
        // Set the height and assign the 'bar' class
        bar.style.height = `${randomHeight}px`;
        bar.className = 'bar';

        // Append the div to the container
        BARCONTAINER.appendChild(bar);
    }

    document.getElementById('bubbleSort').addEventListener('click', () => {
        START.textContent = 'Visualize Bubble Sort!';
    });

    document.getElementById('selectionSort').addEventListener('click', () => {
        START.textContent = 'Visualize Selection Sort!';
    });

    document.getElementById('mergeSort').addEventListener('click', () => {
        START.textContent = 'Visualize Merge Sort!';
    });

    START.addEventListener('click', async () => {
        if (START.textContent == 'Visualize!') {
            START.textContent = 'Pick an algorithm!';
        }
        if (START.textContent == 'Visualize Bubble Sort!') {
            //enable pause/play button while algorithm executes, disable it after 
            PAUSEPLAYBUTTON.removeAttribute('disabled'); 
            await bubbleSort();
            PAUSEPLAYBUTTON.setAttribute('disabled', '');
        }
        if (START.textContent == 'Visualize Selection Sort!') {
            PAUSEPLAYBUTTON.removeAttribute('disabled'); 
            await selectionSort();
            PAUSEPLAYBUTTON.setAttribute('disabled', '');
        } 
        if (START.textContent == 'Visualize Merge Sort!') {
            PAUSEPLAYBUTTON.removeAttribute('disabled'); 
            arr = [...document.querySelectorAll('.bar')];
            await mergeSort(arr);
            PAUSEPLAYBUTTON.setAttribute('disabled', '');
        } 
    });

    PAUSEPLAYBUTTON.addEventListener('click', () => {
        pause = !pause;
        ICON.className = pause ? 'bi bi-play-fill' : 'bi bi-pause-fill';

        if (pause) {
            PAUSEPLAYBUTTON.classList.add('play');
            
        }
        else {
            PAUSEPLAYBUTTON.classList.remove('play');
        }
    });
});