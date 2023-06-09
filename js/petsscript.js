
fetch('./js/pets.json').then(res => res.json()).then(json => {
// console.log(json)
let jsonNew = json;
jsonNew.forEach((el, i, arr) => {
  arr[i].id = i
})
// console.log(jsonNew[2].id)



  const petCardTemplate = document.querySelector('#petCard').content
  const freindsList = document.querySelector('.friends__list')  
  const arrpets = []
  const PETS_COUNT = 48
  let pageSize
  let pageNumber = 1
  let lastPage
  // console.log(petCardTemplate)
  // console.log(freindsList)
  const initPageSize = () => {
    if (window.innerWidth < 768) {
      pageSize = 'mobile'
    }
    if (window.innerWidth < 1221 && window.innerWidth > 785) {
      pageSize = 'tablet'
    }
    if (window.innerWidth > 1220) {
      pageSize = 'desktop'
    }
  }

  initPageSize()

  const getLastPageNumber = () => {
    if (pageSize === 'desktop') {
      lastPage = PETS_COUNT / 8
    }
    if (pageSize === 'tablet') {
      lastPage = PETS_COUNT / 6
    }
    if (pageSize === 'mobile') {
      lastPage = PETS_COUNT / 3
    }
  }

  getLastPageNumber()

  // console.log(arrpets.length)

  const generatePets = () => {
      
    while (arrpets.length < PETS_COUNT) {

      let randomPet = Math.floor(Math.random() * PETS_COUNT)
      if (!arrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
      // 
    }
  }
console.log(arrpets)
  generatePets()


  console.log(jsonNew.length)
  let arrNew = [];
  let k = 0;
  arrpets.forEach((el, i) => {
    arrNew[i] = jsonNew[k]
    if(k == jsonNew.length-1){
      k = 0;
    }
    k++
  })
  console.log(arrNew)




  const petAdd = (itemNumber) => {
    freindsList.append(petCardTemplate.cloneNode(true))
    const sliderItem = freindsList.querySelectorAll('.slider__item')
    const sliderImg = freindsList.querySelectorAll('.slider__img')
    const sliderName = freindsList.querySelectorAll('.slider__name')
      // console.log(sliderItem, sliderImg, sliderName)
      console.log(arrNew[itemNumber])
// console.log(petAdd(arrpets[45]));
    sliderItem[sliderItem.length - 1].setAttribute('id', `${arrNew[itemNumber].id}`);
    sliderName[sliderItem.length - 1].textContent = `${arrNew[itemNumber].name}`;
    sliderImg[sliderItem.length - 1].setAttribute('src', `${arrNew[itemNumber].img}`);
    
  }
  // console.log(jsonNew[arrpets].id)

console.log('lastPage', lastPage, Math.ceil(lastPage))

  const draw = (pageNumber) => {
    if (pageNumber > lastPage) {
      pageNumber = Math.ceil(lastPage)
      pageSpan.textContent = pageNumber
    }
    if (pageSize === 'desktop') {
      for (let i = (pageNumber - 1) * 8; i < pageNumber * 8; i++) {
        petAdd(arrNew[i].id)
      }
    }

    if (pageSize === 'tablet') {
      for (let i = (pageNumber - 1) * 6; i < pageNumber * 6; i++) {
        petAdd(arrNew[i].id)
      }
    }
    if (pageSize === 'mobile') {
      for (let i = (pageNumber - 1) * 3; i < pageNumber * 3; i++) {
        petAdd(arrNew[i].id)
      }
    }
    const friendsList = document.querySelector('.friends__list')
    const popup = document.querySelector('.popup')
    const popupCloseBtn = popup.querySelector('.popup__close-btn')

    friendsList.addEventListener('click',(evt)=>{
      evt.preventDefault()
      if(evt.target.parentNode.classList.contains('slider__item')){
        darkScreen.style.display = 'block'
        const petId = evt.target.parentNode.getAttribute('id')  //---------------------!!!!
        // const pet = json.find(el => el.id === petId)
        
        const pet = jsonNew[petId]
        console.log(petId, pet)
        popup.classList.add('popup--active')
        popup.querySelector('.popup__img').setAttribute('src', pet.img)
        popup.querySelector('.popup__name').textContent = pet.name
        popup.querySelector('.popup__type-breed').textContent = `${pet.type} - ${pet.breed}`
        popup.querySelector('.popup__text').textContent = pet.description
        popup.querySelector('.popup__age').textContent = pet.age
        popup.querySelector('.popup__inoculations').textContent = pet.inoculations
        popup.querySelector('.popup__diseases').textContent = pet.diseases
        popup.querySelector('.popup__parasites').textContent = pet.parasites
        document.querySelector('.header-pets').style.zIndex = '1'
        document.body.style.overflowY = 'hidden'
      }

      let popupClose = (evt) => {
        evt.preventDefault()
        darkScreen.style.display = 'none'
        popup.classList.remove('popup--active')
        document.body.style.overflowY = 'visible'   
        document.querySelector('.header-pets').style.zIndex = '3'     
      }

      popupCloseBtn.addEventListener('click', popupClose)

      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          popupClose(evt)
        }
      })

      document.querySelector('.dark-screen').addEventListener('click', popupClose)

    })

    popup.addEventListener('mouseleave',()=>{
      popupCloseBtn.style.backgroundColor ='#FDDCC4'
    })

    popup.addEventListener('mouseenter',(e)=>{
      popupCloseBtn.style.backgroundColor =null
    })
  }

  draw(pageNumber)

  const delPets = () => {
    while (freindsList.firstChild) {
      freindsList.removeChild(freindsList.firstChild);
    }
  }

  window.addEventListener('resize', () => {
    let oldPageSize = pageSize
    initPageSize()
    if (oldPageSize !== pageSize) {
      initPageSize()
      delPets()
      draw(pageNumber)
    }
  })

  const nextBtn = document.querySelector('.friends__slide-btn--next')
  const lastBtn = document.querySelector('.friends__slide-btn--last')
  const previousBtn = document.querySelector('.friends__slide-btn--previous')
  const firstBtn = document.querySelector('.friends__slide-btn--first')
  const pageSpan = document.querySelector('.pets__page')





  nextBtn.addEventListener('click', () => {
    pageNumber++
    pageSpan.textContent = pageNumber
    delPets()
    draw(pageNumber)
    if (pageNumber === lastPage) {
      lastBtn.setAttribute('disabled', 'disabled')
      nextBtn.setAttribute('disabled', 'disabled')
    }
    firstBtn.removeAttribute('disabled')
    previousBtn.removeAttribute('disabled')
  })

  previousBtn.addEventListener('click', () => {
    pageNumber --
    pageSpan.textContent = pageNumber
    delPets()
    draw(pageNumber)
    if (pageNumber === 1) {
      firstBtn.setAttribute('disabled', 'disabled')
      previousBtn.setAttribute('disabled', 'disabled')
    }
    lastBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')

  })

  lastBtn.addEventListener('click', () => {
    pageNumber = lastPage
    pageSpan.textContent = lastPage
    delPets()
    draw(pageNumber)
    lastBtn.setAttribute('disabled', 'disabled')
    nextBtn.setAttribute('disabled', 'disabled')
    firstBtn.removeAttribute('disabled')
    previousBtn.removeAttribute('disabled')
  })

  firstBtn.addEventListener('click', () => {
    pageNumber = 1
    pageSpan.textContent = pageNumber
    delPets()
    draw(pageNumber)
    firstBtn.setAttribute('disabled', 'disabled')
    previousBtn.setAttribute('disabled', 'disabled')
    lastBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')
  })

 
})