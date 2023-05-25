import { type Component } from "vue";
import ItemListQuestions from '@/components/questionnaire/itemListQuestions.vue'


export class Story {
    private title: String
    private component: Component | null
    private parent: Story | null
    private paths: Array<Story>
    private step: Number | null

    constructor(title: String, component = null, step = null) {
        this.title = title
        this.component = component
        this.parent = null
        this.paths = []
        this.step = step
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
}

const story = new Story("Вопрос 1", ItemListQuestions, 1)
const storyA = story.addPath(new Story("path A", null, 2))
const storyB = story.addPath(new Story("path B", null, 2))
const storyC = story.addPath(new Story("path C", null, 2))
const storyNext = new Story("next")

storyA.addPath(storyNext)
storyB.addPath(storyNext)
storyC.addPath(storyNext)

export default story
