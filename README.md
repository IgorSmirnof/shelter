## Адаптивный сайт для питомника животных Shelter [RS School](https://rs.school/)

![](https://github.com/igorsmirnof/shelter/raw/gh-pages/shelter.png)

**Задачи**
* Сверстать страницу согласно макету [Figma](https://www.figma.com/file/tKcmzkARtMUFQAR9VLdLkl/shelter-dom) 
* Реализовать адаптивный сайт для питомника животных. 
* Сделать слайдер, бургер-меню, пагинация и попапы.

**Особенности**

#### Slider
- Слайдер бесконечный, не имеет границ, т.е. можно нажимать влево и вправо сколько угодно раз, и каждый раз контент в блоках будет новый. В нашем случае, каждый новый слайд будет содержать **псевдослучайный** набор питомцев, т.е. формироваться из исходных объектов в случайном порядке, с двумя условиями. Во-первых, в самом блоке слайда карточки с птомцами повторяться не будут. Во-вторых, в следующем блоке, дублирующихся карточек с карточками текущего блока, не будет. Например в сладйдере из 3 элементов, следующий выезжающий слайд будет содержать 3 новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде.

#### Popup
- При наведении мышкой на затемненную область или кнопку с крестиком, т.е. при событии `hover`, кнопка должна получить эффект наведения. Другими словами: кнопка интеректавная. При этом при наведении на окно (блок) самого попапа ничего не происходит.

#### Pagination
- При загрузке `Our Pets` должен быть сформирован массив из 48 элементов псевдо-случайным образом. Каждый из 8 приведенных на макете питомцев должен встречаться ровно 6 раз. При этом каждые 8, каждые 6, и каждые 3, питомца не должны повторяться. Т.е. на одной странице пагинации не может быть одноврменно два одинаковых питомца.
