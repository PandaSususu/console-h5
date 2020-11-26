import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  formatDate: (val) => {
    if (moment(val).isBefore(moment().subtract(7, 'days'))) {
      return moment(val).format('YYYY-MM-DD')
    } else {
      return moment(val).from(moment())
    }
  }
}
