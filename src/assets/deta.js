const deta = function(){
	this.date = new Date();                             //获取当前时间
	this.Year = this.date.getFullYear()                 //获取当前年份
	this.Month = this.date.getMonth()                   //获取当前月份 0-11
	this.Day = this.date.getDate()                      //获取当前日 1-31
	this.toDay = ""                                     //总天数
	this.firstDay = ""                                  //每月1号是星期几

	//判断闰年返回的总天数
	this.days = function (year, munth) {
		//判断2月
		if (munth == 2) {
			this.toDay = (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0) ? 29 : 28;
		} else {
		//判断1-7月，单月为31
		if (munth < 8) {
			this.toDay = munth % 2 == 1 ? 31 : 30;
		} else {
		//判断8-12月，双月为31
			this.toDay = munth % 2 == 0 ? 31 : 30;
		}
		}
		return this.toDay;
	}
	//获取日期数据
	this.dayList = function (Year, Month) { //Month+1
		let array = new Array()                            //存放数据		
		this.today = this.days(Year, parseInt(Month) + 1)          //获取每月的总天数
		let day;
		for (let i = 1; i <= this.today; i++) {
			array.push(i)
		}
		return array
	}
}

const time = new deta();

module.exports = {
  time
}