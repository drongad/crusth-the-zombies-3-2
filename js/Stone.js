class Stone{
    constructor(x,y,w,h){
        var options = {
            restitution:0.8
        }
        this.body = Bodies.rectangle(x,y,w,h,options)
        this.w = w
        this.h = h
        this.image = loadImage("stone.png")
        World.add(world,this.body)

    }

    show(){
        let pos = this.body.position
        push()
        translate(pos.x,pos.y)
        image(this.image,0, 0, this.w, this.h)
        
        noStroke()
        pop()

    }
}