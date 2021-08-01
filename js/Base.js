class Base{
  
    constructor(x,y,w,h,isStatic){
        let options={
            isStatic:isStatic
        }
        this.body = Bodies.rectangle(x,y,w,h,options)
        this.w = w
        this.h = h
       
        World.add(world,this.body)


    }
    show(){
        let pos = this.body.position
        push()
        translate(pos.x,pos.y)
        rectMode(CENTER)
        fill("brown")
        noStroke()
        rect(0,0,this.w,this.h)
        pop()

    }
}