<template>
  <div id="list">
    <div class="container">      
      <UserBar></UserBar>
      <mu-row gutter>
        <mu-col span="12" lg="4" sm="6">
          <mu-date-input v-model="startDate" label="选择开始日期" value-format="YYYY-MM-DD" no-display label-float full-width></mu-date-input>
        </mu-col>
        <mu-col span="12" lg="4" sm="6">
          <mu-date-input v-model="endDate" label="选择结束日期" value-format="YYYY-MM-DD" no-display label-float full-width></mu-date-input>
        </mu-col>
        <mu-col span="12" lg="4" sm="12">
          <div class="button-wrapper">
            <mu-button color="info" @click="handleSearchClick()">查询</mu-button>
            <mu-button color="info" @click="handleDownloadExcel()">导出 Excel</mu-button>
          </div>
        </mu-col>
      </mu-row>
      <div class="list-table">
          <mu-paper :z-depth="1">            
            <mu-data-table :columns="columns" stripe :sort.sync="sort" @sort-change="handleSortChange" :data="pageList">
              <template slot-scope="scope">
                <td>{{scope.row.userName}}</td>
                <td class="is-right">{{scope.row.mobile}}</td>
                <td class="is-right">{{scope.row.createTime | fromNow}}</td>
              </template>
            </mu-data-table>
            <mu-flex justify-content="center">
              <mu-pagination :total="total" :page-size="pagesize" :page-count="pagecount" :current.sync="current" @change="handlepaginationChange()"></mu-pagination>
            </mu-flex>
          </mu-paper>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import API_CONFIG from "@/utils/api";
import axios from 'axios'; // axios
import qs from 'qs';
export default {
  name: 'List',
  data () {
    return {
      startDate: "", // 开始时间
      endDate: "",   // 结束时间      
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: '姓氏', width: '25%', name: 'userName' },
        { title: '电话', name: 'mobile', width: '30%', align: 'right', sortable: true },        
        { title: '时间', name: 'createTime', width: '45%', align: 'right', sortable: true }        
      ],
      userList: [{
        // "pFrom":"1",
        // "createTime":1542853773000,
        // "channel":"1",
        // "mobile":"13254863864",
        // "userName":"白先生",
        // "userId":57
      }],
      pageList: [], // 分页后数据
      // 分页
      total: 0,     // 总条目数
      current: 1,     // 当前页数
      pagesize: 10,   // 每页显示条目个数
      pagecount: 7   // 页码按钮的数量，当总页数超过该值时会折叠
    }    
  },
  computed: {
    ...mapState(["isLogin", "username"])
  },
  created () {
    this.featchUserList("","",1)
  },
  methods: {
    // 排序
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },

    // 查询
    handleSearchClick () {
      this.featchUserList (this.startDate, this.endDate);
    },

    // 分页 
    handlepaginationChange () {
      const list = this.userList;
      const pageList = [];
      let page = this.current;
      if (list.length) {
        for (let i = (page -1) * 10; i < page * 10; i++) {
          if (list[i] !== undefined) {
            pageList.push(
              list[i]
            ) 
          }
        }
      }
      this.pageList = pageList;
      // console.log(this.pageList)
    },

    // 下载Excel
    handleDownloadExcel () {
      axios.get(API_CONFIG.downloadFile,{
        params: {
          startDate: this.startDate,
          endDate: this.endDate
        },
        responseType: 'blob' 
      }).then(res => {
        // console.log(res.data);
        this.download(res.data);
      }).catch(err => err);
    },

    // 下载Excel
    download (data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', '借款申请名单.xlsx');

      document.body.appendChild(link);
      link.click();
    },

    // 获取用户列表
    featchUserList (startDate, endDate, page) {
      axios.get(API_CONFIG.getUsetList, {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      }).then(res => {
        if (res.data.returnCode === '0000') {
          this.userList = res.data.dataList;         
          this.total = res.data.dataList.length;
          this.handlepaginationChange();
        }
      }).catch(err => err);
    }
  }
}
</script>

<style lang="stylus">
body
  background #fef6e1
#list
  max-width 876px    
  margin 0 auto
  .button-wrapper
    padding-top: 28px;
    padding-bottom: 12px;
    text-align right
    button 
      margin-left 10px
  .mu-table 
    table
      width 100%
  .mu-pagination
    padding 15px 0
</style>
