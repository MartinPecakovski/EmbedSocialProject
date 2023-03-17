

const allData = fetch('http://127.0.0.1:5500/data.json').then(res => res.json())

const layout = document.querySelector('.layout-placeholder')
const topContainer = document.querySelector('.topContainer')
const sourceFilter = document.querySelectorAll('input[name="filterBySource"]')
const loadMoreButton = document.querySelector('#loadMore button')
const backgroundColorPicker = document.querySelector('#cardBackgroundColor')
const previewContainer = document.querySelector('.preview')

backgroundColorPicker.addEventListener('keyup', () => {
    previewContainer.style.backgroundColor = backgroundColorPicker.value
})

const cardContent = (data) => {
    return `
					<div class="profileDetails">

						<div class="basicDetails">
							<div class="avatar">
								<img src='${data.profile_image}' alt="">
							</div>
	
							<div class="fullName">
	
							</div>
	
							<div class="date">
								
							</div>
						</div>

						<div class="socialIcon">
							<object data="" type=""></object>
						</div>
					</div>
					<div class="postPhoto">
						<img src="" alt="">
					</div>
				<div class="caption">
                <a href='${data.source_link}'>#Lorem</a> ${data.caption}
                </div>
                    
					<br/>
					<div class="heartContainer">
						<div class="heart">
							<object data="" type=""></object>
						</div>
						<div class="counter"></div>
					</div>
    `
}

const createCard = (data) => {
    const div = document.createElement('div')
        div.classList.add('cardContainer')
                div.innerHTML = cardContent(data)
                topContainer.append(div)
}

const displayOnlyFour = (data) => {
    firstFour = data.slice(0, 4)
    firstFour.map(post => {
        const div = document.createElement('div')
        div.classList.add('cardContainer')
        div.innerHTML = cardContent(post)
        topContainer.append(div)
    })
}

allData.then(data => {
    displayOnlyFour(data)
})

let limit = 8
let offset = 4

loadMoreButton.addEventListener('click', () => {
    allData.then(data => {
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
})


sourceFilter.forEach(input => {
    input.addEventListener('change', () => {
        topContainer.innerHTML = ''

        checkBoxValue = Array.from(sourceFilter).find(input => input.checked).value

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

                filteredData.length > 4 ? displayOnlyFour(filteredData) : (
                    filteredData.forEach(post => {
                    loadMoreButton.style.display = 'none'
                        createCard(post)
                    })
                )
            })
        )

    })
})



