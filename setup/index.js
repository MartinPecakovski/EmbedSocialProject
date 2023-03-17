
const allData = fetch('http://127.0.0.1:5500/data.json').then(res => res.json())

const layout = document.querySelector('.layout-placeholder')
const topContainer = document.querySelector('.topContainer')
const sourceFilter = document.querySelectorAll('input[name="filterBySource"]')
const loadMoreButton = document.querySelector('#loadMore button')
const backgroundColorPicker = document.querySelector('#cardBackgroundColor')
const previewContainer = document.querySelector('.preview')
const gapSetter = document.querySelector('#cardSpaceBetween')
const columnsSelect = document.querySelector('#numberOfColumns')

backgroundColorPicker.addEventListener('keyup', () => {
    previewContainer.style.backgroundColor = backgroundColorPicker.value
})

function dateFormat(input_D, format_D) {

    const m = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

const date = new Date(input_D);


const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    

    format_D = format_D.replace("MM", m[Number(month) - 1].slice(0,3));        

    if (format_D.indexOf("yyyy") > -1) {
        format_D = format_D.replace("yyyy", year.toString());
    } else if (format_D.indexOf("yy") > -1) {
        format_D = format_D.replace("yy", year.toString().substr(2,2));
    }

    format_D = format_D.replace("dd", day.toString().padStart(2,"0"));

    return format_D;
}



const cardContent = (data, idx) => {
    const date = new Date(data.date)
    return `
					<div class="profileDetails">

						<div class="basicDetails">
                            <div class="avatar">
								<img src='${data.profile_image}' alt="">
							</div>
	
							<div class="personalInfo">

							<div class="fullName">
                                ${data.name}
							</div>
	
							<div class="date">
                            ${dateFormat(date, 'dd MM yyyy')}
							</div>
                            </div>

						</div>

						<div class="socialIcon">
							<object data="" type=""></object>
						</div>
					</div>
					<div class="postPhoto">
						<img src="${data.image}" alt="">
					</div>
				<div class="caption">
                <a href='${data.source_link}'>#Lorem</a> ${data.caption}
                </div>
                    
					<hr />
					<div class="heartContainer">
						<div class="heart" id='${idx}'>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="red" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
						</div>
						<div class="counter">${data.likes}</div>
					</div>
    `
}




let id = 4

const createCard = (data) => {
    const div = document.createElement('div')
    div.setAttribute('id', id)
        div.classList.add('cardContainer')
                div.innerHTML = cardContent(data, id)
                topContainer.append(div)

               
id++

 document.querySelectorAll('.heart').forEach(h => { 
        h.addEventListener('click', ()=> {
    
            if(h.querySelector('svg').getAttribute('fill').value === 'red'){
                h.setAttribute('fill', 'none')
            } else{
                const heart = document.querySelectorAll('.heart svg')


                heart.forEach(h => { 
                    h.addEventListener('click', ()=> {
                        let attribute = h.getAttribute('fill')
                        if(attribute === 'red'){
                            h.setAttribute('fill', 'none')
                
                            let sybling = h.parentElement.parentElement.querySelector('.counter').innerHTML
                
                            sybling = (Number(sybling) -1).toString()
                    
                            h.parentElement.parentElement.querySelector('.counter').innerHTML = sybling
                            
                        } else{        
                        h.setAttribute('fill', 'red')
                
                        let sybling = h.parentElement.parentElement.querySelector('.counter').innerHTML
                
                        sybling = (Number(sybling) + 1).toString()
                
                        h.parentElement.parentElement.querySelector('.counter').innerHTML = sybling
                        }
                            
                    })
                })
            }
    
                
        })
    })
}


const displayOnlyFour = (data) => {
    firstFour = data.slice(0, 4)
    firstFour.map((post, idx) => {
        const div = document.createElement('div')
        div.classList.add('cardContainer')
        div.setAttribute('id', idx)
        div.innerHTML = cardContent(post, idx)
        topContainer.append(div)
    })
        
    const heart = document.querySelectorAll('.heart')
    heart.forEach(h => { 
        h.addEventListener('click', ()=> {
    
            if(h.querySelector('svg').getAttribute('fill').value === 'red'){
                h.setAttribute('fill', 'none')
            } else{
                const heart = document.querySelectorAll('.heart svg')


                heart.forEach(h => { 
                    h.addEventListener('click', ()=> {
                        let attribute = h.getAttribute('fill')
                        if(attribute === 'red'){
                            h.setAttribute('fill', 'none')
                
                            let sybling = h.parentElement.parentElement.querySelector('.counter').innerHTML
                
                            sybling = (Number(sybling) -1).toString()
                    
                            h.parentElement.parentElement.querySelector('.counter').innerHTML = sybling
                            
                        } else{        
                        h.setAttribute('fill', 'red')
                
                        let sybling = h.parentElement.parentElement.querySelector('.counter').innerHTML
                
                        sybling = (Number(sybling) + 1).toString()
                
                        h.parentElement.parentElement.querySelector('.counter').innerHTML = sybling
                        }
                            
                    })
                })
            }
    
                
        })
    })

}


allData.then(data => {
    displayOnlyFour(data)
})

let limit = 8
let offset = 4

const loadData = (passeddata) => {
    passeddata.then(data => {
        const allTheRest = data.slice(offset, limit)
        
        if(limit <= data.length){
            allTheRest.map(post => {
                createCard(post)
            })
        } 
        limit += 4
        offset +=4
        if(limit > data.length) {
            loadMoreButton.style.display = 'none'
            limit = 8
            offset = 4
            
        }
    })
}

loadMoreButton.addEventListener('click', () => {
    loadData(allData)
})


sourceFilter.forEach(input => {
    input.addEventListener('change', () => {
        topContainer.innerHTML = ''

       let checkBoxValue = Array.from(sourceFilter).find(input => input.checked).value

        loadMoreButton.style.display = 'block'
        
        checkBoxValue === 'all'?(
            allData.then(data => {
                displayOnlyFour(data)
            })
        ):(
            allData.then(data => {
              let filteredData =  data.filter(post => {
                    return post.source_type === checkBoxValue
                })

                    if(filteredData.length === 0) loadMoreButton.style.display = 'none', topContainer.innerHTML = `
                    <h1>No ${input.value} posts sorry!</h1>
                    `
                    
                    filteredData.forEach(post => {
                    loadMoreButton.style.display = 'none'
                        createCard(post)
                    })
            })
        )

    })
})


gapSetter.addEventListener('keyup', ()=>{
    topContainer.style.gap = gapSetter.value
})

const setColumn = (valueCol) => {
    const cardContainer = document.querySelectorAll('.cardContainer')
    cardContainer.forEach((value) => {
        value.style.flexBasis = valueCol
    })
}


columnsSelect.addEventListener('change', ()=> {


    
    if(columnsSelect.value === '5' || columnsSelect.value === 'dynamic'){
        
        setColumn('17%')
    } else if(columnsSelect.value === '1'){
        setColumn('100%')
        
    }else if(columnsSelect.value === '2'){
        setColumn('46%')
        
    }else if(columnsSelect.value === '3'){
        setColumn('28%')
        
    }else if(columnsSelect.value === '4'){
        setColumn('21%')
        
    }

})