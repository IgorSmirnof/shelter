
fetch('./js/pets.json').then(res => res.json()).then(json => {
  let jsonNew = json;
  // console.log(jsonNew)
  
  const petCardTemplate = document.querySelector('#petCard').content
  let pageSize
  let isEnable = true
  let initPageSize = () => {
    if (window.innerWidth < 768) {
      pageSize = 'mobile'
    } else if (window.innerWidth < 1100) {
      pageSize = 'tablet'
    } else {
      pageSize = 'decktop'
    }
  }

  initPageSize()


  const popup = document.querySelector('.popup')
  const popupCloseBtn = popup.querySelector('.popup__close-btn')
  const petsSection = document.querySelector('.pets')
  const petsSlider = document.querySelector('.pets__slider')
  const sliderList = document.querySelector('.slider__list')

  petsSlider.addEventListener('click', (evt) => {
    evt.preventDefault()

    if (evt.target.parentNode.classList.contains('slider__item')) {
      darkScreen.style.display = 'block'
      const petId = evt.target.parentNode.getAttribute('id')
      const pet = jsonNew[petId];
      popup.classList.add('popup--active')


      // json.find(el => console.log(json.el))
      
      popup.querySelector('.popup__img').setAttribute('src', pet.img)
      popup.querySelector('.popup__name').textContent = pet.name
      popup.querySelector('.popup__type-breed').textContent = `${pet.type} - ${pet.breed}`
      popup.querySelector('.popup__text').textContent = pet.description
      popup.querySelector('.popup__age').textContent = pet.age
      popup.querySelector('.popup__inoculations').textContent = pet.inoculations
      popup.querySelector('.popup__diseases').textContent = pet.diseases
      popup.querySelector('.popup__parasites').textContent = pet.parasites
      document.body.style.overflowY = 'hidden'
    }

    const popupClose = (evt) => {
      evt.preventDefault()
      darkScreen.style.display = 'none'
      popup.classList.remove('popup--active')
      document.body.style.overflowY = 'visible'
    }

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        popupClose(evt)
      }
    })

    popupCloseBtn.addEventListener('click', popupClose)

    document.querySelector('.dark-screen').addEventListener('click', popupClose)


  })


  let arrpets = []

  const generatePets = () => {
    while (arrpets.length < 3) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length))
      if (!arrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
  }

  const generateAnotherPets = () => {
    const oldarrpets = arrpets
    arrpets = []
    while (arrpets.length < 3) {
      let randomPet = Math.floor(Math.random() * Math.floor(json.length))
      if (!arrpets.includes(randomPet) && !oldarrpets.includes(randomPet)) {
        arrpets.push(randomPet)
      }
    }
    console.log('arrpets ' + arrpets)
  }

  generatePets()

  const petListAdd = (direction) => {
    let sliderList = document.createElement('ul')
    sliderList.classList.add('slider__list')
    if (direction === 'next') {
      petsSlider.append(sliderList)
    } else {
      petsSlider.prepend(sliderList)
    }
    // console.log(json)
    for (let i = 0; i < 3; i++) {
      const itemNumber = arrpets[i]
      sliderList.append(petCardTemplate.cloneNode(true))
      const sliderItem = sliderList.querySelectorAll('.slider__item')
      const sliderImg = sliderList.querySelectorAll('.slider__img')
      const sliderName = sliderList.querySelectorAll('.slider__name')
      // console.log(sliderItem)
      sliderItem[sliderItem.length - 1].setAttribute('id', `${itemNumber}`)
      sliderName[sliderItem.length - 1].textContent = `${json[itemNumber].name}`
      sliderImg[sliderItem.length - 1].setAttribute('src', `${json[itemNumber].img}`)
      // console.log(json[itemNumber])
    }

  }

  petListAdd('next')

  const draw = (direction) => {
    const sliderItems = document.querySelectorAll('.slider__item')
    if (direction === 'previous') {
      if (pageSize === 'decktop') {
      }
      if (pageSize === 'tablet') {
        let a = sliderItems[2]
        a.style.display = 'none'
      }
      if (pageSize === 'mobile') {
        let a = sliderItems[2]
        let b = sliderItems[1]
        a.style.display = 'none'
        b.style.display = 'none'
      }
    } else {
      if (pageSize === 'decktop') {
      }
      if (pageSize === 'tablet') {
        let a = sliderItems[5]
        a.style.display = 'none'
      }
      if (pageSize === 'mobile') {
        let a = sliderItems[5]
        let b = sliderItems[4]
        a.style.display = 'none'
        b.style.display = 'none'
      }
    }

  }
  draw('previous')



  window.addEventListener('resize', () => {
    let oldPageSize = pageSize
    initPageSize()

    if (oldPageSize !== pageSize) {
      const sliderItems = document.querySelectorAll('.slider__item')
      let a = sliderItems[1]
      let b = sliderItems[2]

      if (pageSize === 'tablet' && oldPageSize === 'decktop') {
        b.style.display = 'none'
      }

      if (pageSize === 'tablet' && oldPageSize === 'mobile') {
        a.style.display = 'block'
      }

      if (pageSize === 'mobile') {
        a.style.display = 'none'
        b.style.display = 'none'
      }

      if (pageSize === 'decktop') {
        a.style.display = 'block'
        b.style.display = 'block'
      }
    }
  })

  const sliderBtnPrevious = document.querySelector('.pets__slide-btn--previous')
  const sliderBtnNext = document.querySelector('.pets__slide-btn--next')

  const dellist = (direction) => {
    const sliderlists = document.querySelectorAll('.slider__list')
    if (direction === 'next') {
      sliderlists[0].remove()
    }
    if (direction === 'previous') {
      sliderlists[1].remove()
    }
  }

  sliderBtnPrevious.addEventListener('click', function () {
    if (isEnable === true) {
      isEnable = false
      const direction = 'previous'

      generateAnotherPets()
      petListAdd(direction)
      draw(direction)
      const sliderlists = document.querySelectorAll('.slider__list')
      sliderlists[1].style.left = '-100%'
      sliderlists[0].style.zIndex = '2'
      sliderlists[0].classList.add('from-left')
      sliderlists[0].addEventListener('animationend', () => {
        dellist(direction)
        document.querySelector('.slider__list').classList.remove('from-left')
        sliderlists[0].style.zIndex = '0'
        isEnable = true
      })
    }


  })

  sliderBtnNext.addEventListener('click', function () {
    if (isEnable === true) {
      isEnable = false
      const direction = 'next'
      generateAnotherPets()
      petListAdd(direction)
      draw(direction)
      const sliderlists = document.querySelectorAll('.slider__list')
      sliderlists[1].classList.add('from-right')
      sliderlists[1].addEventListener('animationend', () => {
        dellist(direction)
        document.querySelector('.slider__list').classList.remove('from-right')
        isEnable = true
      })
    }
  })





})