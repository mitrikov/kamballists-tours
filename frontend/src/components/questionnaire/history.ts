import { type Component } from "vue";
import ItemListQuestions from '@/components/questionnaire/itemListQuestions.vue'
import ItemWhereAndWhen from "@/components/questionnaire/ItemWhereAndWhen.vue";
import ItemInterests from "@/components/questionnaire/ItemInterests.vue";
import ItemKitchen from "@/components/questionnaire/ItemKitchen.vue";


export class Story {
    private title: String
    private component: Component | null
    private parent: Story | null
    private paths: Array<Story>
    private step: Number | null
    private data: any | null = null

    constructor(title: String, component: Component | null = null, step: Number | null = null, data = null) {
        this.title = title
        this.component = component
        this.parent = null
        this.paths = []
        this.step = step
        this.data = data
    }

    addPath(path: Story){
        this.paths.push(path)
        this.paths[this.paths.length - 1].parent = this
        return this.paths[this.paths.length - 1]
    }

    isEnd(){
        return this.paths.length == 0
    }

    isBack(){
        return this.parent != null
    }

    getTitle(){
        return this.title
    }

    getComponent(){
        return this.component
    }

    getStep(){
        return this.step
    }

    getParent(): Story | null {
        if(this.parent)
            return this.parent
        return null
    }

    getPaths(){
        return this.paths
    }

    getData(){
        return this.data
    }
}

// @ts-ignore
const story = new Story("Куда и когда?", ItemListQuestions, 1, [
    { title: 'Уже знаю направление и дату поездки', img: '1.png' },
    { title: 'Знаю когда, но не выбрал направление', img: '2.png' },
    { title: 'Определился с направлением, но не выбрал дату', img: '3.png' }
])

const storyA = story.addPath(new Story("Куда и когда?", ItemWhereAndWhen, 2))
const storyB = story.addPath(new Story("Куда и когда?", ItemWhereAndWhen, 2))
const storyC = story.addPath(new Story("Куда и когда?", ItemWhereAndWhen, 2))

// @ts-ignore
const storyNext = new Story("Мне подойдет", ItemListQuestions, 3, [
    { title: 'Экономичное путешествие(ценю простоту и уют)', img: '4.png' },
    { title: 'Умеренные условия (качественно и комфортно)', img: '5.png' },
    { title: 'Высокий уровень (насладиться роскошью)', img: '6.png' }
])

storyNext
    .addPath(new Story("Интересы", ItemInterests, 4))
    .addPath(new Story("Кухня", ItemKitchen, 5))

// @ts-ignore
const plans = new Story("В путешествии", ItemListQuestions, 2, [
    { title: 'Поспешу увидеть главные достопримечательности', img: '7.png' },
    { title: 'Постараюсь найти то, что скрыто от глаз', img: '8.png' },
])

storyA.addPath(plans).addPath(storyNext)
storyB.addPath(plans).addPath(storyNext)
storyC.addPath(storyNext)


export default story