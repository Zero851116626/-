
/*
* 每个数字由20个点做成
* */

const numList = {
  /*  1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0*/
  0: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  1: [0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
  2: [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1],
  3: [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1],
  4: [1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
  5: [1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1],
  6: [1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  7: [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
  8: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  9: [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1],
}
// 点坐标
const pointPos = [
  // 1-4
  {x: 12, y: 20},
  {x: 22, y: 20},
  {x: 32, y: 20},
  {x: 42, y: 20},
  // 5-10
  {x: 42, y: 30},
  {x: 42, y: 40},
  {x: 42, y: 50},
  {x: 42, y: 60},
  {x: 42, y: 70},
  {x: 42, y: 80},
  // 11-13
  {x: 32, y: 80},
  {x: 22, y: 80},
  {x: 12, y: 80},
  // 14-18
  {x: 12, y: 70},
  {x: 12, y: 60},
  {x: 12, y: 50},
  {x: 12, y: 40},
  {x: 12, y: 30},
  // 19-20
  {x: 22, y: 50},
  {x: 32, y: 50},
]


class Count {
  constructor(node, originTime) {
    this.originTime = originTime
    this.wrap = node
    this.canvas = document.createElement('canvas')
    this.createView()
    this.count()
  }
  // 创建视图
  createView() {
    let timeLength = this.originTime.toString().length
    this.width = timeLength * 50 + (timeLength - 1) * 10
    this.height = 100
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.wrap.append(this.canvas)
    if (this.canvas.getContext) {
      const ctx = this.canvas.getContext('2d')
      for (let j = 0; j < timeLength; j++) {
        // 横向 坐标点位偏移量
        const offset = j * 60
        for (let i = 0; i<pointPos.length;i++) {
          ctx.beginPath()
          // 移动笔触
          ctx.moveTo(pointPos[i].x + offset, pointPos[i].y + 3)
          // 描述路径
          ctx.arc(pointPos[i].x + offset, pointPos[i].y, 3, 0, 2 * Math.PI, false)
          // 画
          ctx.strokeStyle = 'rgba(0,0,0,.1)'
          ctx.stroke()
        }
      }
    }
  }
  // 画点
  // 传数字
  drawPoint(num, offsetUnit) {
    let arr = numList[num]
    let timeLength = this.originTime.toString().length
    const offset = offsetUnit * 60
    const ctx = this.canvas.getContext('2d')

    pointPos.forEach((item, index) => {
      ctx.beginPath()
      // 移动笔触
      ctx.moveTo(item.x + offset, item.y + 3)
      // 描述路径
      ctx.arc(item.x + offset, item.y, 3, 0, 2 * Math.PI, false)
      // 画
      if (arr[index]) {
        ctx.strokeStyle = 'red'
        ctx.stroke()
      } else {
        ctx.strokeStyle = 'rgba(0,0,0,.1)'
        ctx.stroke()
      }
      ctx.closePath()
    })
  }
  // 拆数字
  splitNum(number) {
    let numbArr = number.toString().split('')
    if(this.originTime.toString().length > numbArr.length) {
      for(let i = 0,l = this.originTime.toString().length - numbArr.length; i<l; i++) {
        numbArr.unshift('0')
      }
    }
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0,0, this.width, this.height)
    numbArr.forEach((item, index) => {
      this.drawPoint(item, index)
    })
  }
  // 倒计时
  count() {
    let number = Number(this.originTime)
    this.timerFunc(number)
  }
  timerFunc(number) {
    console.log(number)
    if (number > -1) {
      setTimeout(()=>{
        const ctx = this.canvas.getContext('2d')
        ctx.clearRect(0,0, this.width, this.height)
        this.splitNum(number)

        number--
        this.timerFunc(number)

      }, 1000)
    } else {
      console.log('结束')
    }
  }
}