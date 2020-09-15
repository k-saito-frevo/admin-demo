<template>
  <v-container id="temperature" fluid tag="section">
  <v-dialog v-model="dialog" max-width="80%" max-height="50%">
          <template v-slot:activator="{on,attrs}">
          </template>
            <v-card>
                <v-form>
                    <v-card-title>
                    <span class="headline">9/12 工事A　車両A</span>
                    </v-card-title>
                    <v-card-text class="ml-5">
                    <v-container>
                      <div >
                        <line-chart :chart-data="data" :options="options" width="40" height="10" class="mb-5"> </line-chart>
                        <v-data-table
                          :headers="graphHeaders"
                          :items="graphItems"
                          multi-sort
                          locale="ja-jp"
                          :loading="load"
                          loading-text="読込中"
                          no-data-text="データがありません。"
                          class="elevation-1 mb-5"
                          :items-per-page=10
                          :items-per-page-options= "[5,10, 30, 50, -1]"            
                          @page-count="pageCount = $event"
                          hide-default-footer
                        >
                        <template v-slot:item="{item}">
                          <tr>
                              <td>{{item.id}}</td>
                              <td>{{item.number}}</td>
                              <td>{{item.time}}</td>
                              <td>{{item.temperature}}</td>
                          </tr>
                        </template>        
                        <template v-slot:footer>
                            <v-pagination 
                                v-model="page" 
                                option
                                circle 
                                :length="pageCount" 
                                :total-visible="7"
                                :prev-icon="prevIcon"
                                :next-icon="nextIcon"
                            />
                        </template>        
                      </v-data-table>
                      </div>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-card-footer absolute>
                        <v-btn  @click="closeDialog">閉じる</v-btn>
                    </v-card-footer>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>    
      <base-material-card icon="mdi-coolant-temperature" class="px-5 py-3">
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        :return-value.sync="targetYM"
        transition="scale-transition"
        offset-y
        min-width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="targetYM"
            :value="computedDateFormattedMomentjs"
            label="対象年月"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            style="width:260px"></v-text-field>
        </template>
        <v-date-picker locale="ja" v-model="targetYM" type="month" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="$refs.menu.save(targetYM)">OK</v-btn>
        </v-date-picker>
      </v-menu>
            
        <v-data-table
            :headers="headers"
            :items="items"
            multi-sort
            locale="ja-jp"
            :loading="load"
            loading-text="読込中"
            no-data-text="データがありません。"
            class="elevation-1"
            :items-per-page=5
            :items-per-page-options= "[5,10, 30, 50, -1]"            
            :page.sync="page"
            @page-count="pageCount = $event"
            hide-default-footer
        >
          <template v-slot:item="{item}">
            <tr>
                <td>{{item.date}}</td>
                <td>{{item.linkedDeviceId}}</td>
                <td>{{item.linkedVehicleNumber}}</td>
                <td>{{item.linkedDriverName}}</td>
                <td>{{item.departureTime}}</td>
                <td>{{item.departureTemperature}}</td>
                <td>{{item.arrivalTime}}</td>
                <td>{{item.latestTemperature}}</td>
                <td><v-btn class="warning" small @click="openDialog">
                  <v-icon>mdi-chart-areaspline</v-icon>表示
                  </v-btn>
                </td>
            </tr>
          </template>        
          <template v-slot:footer>
              <v-pagination 
                  v-model="page" 
                  option
                  circle 
                  :length="pageCount" 
                  :total-visible="7"
                  :prev-icon="prevIcon"
                  :next-icon="nextIcon"
              />
          </template>        
        </v-data-table>
    </base-material-card>    
  </v-container>
</template>

<script>
  import LineChart from '../../../../components/base/LineChart'
  import { VMonthPicker } from 'v-month-picker';  
  export default {
    name: 'Temperature',
    components:{LineChart,VMonthPicker},
    data: ()=> ({
        headers:[
          {text:"日付",value:"date"},
          {text:"デバイスID",value:"linkedDeviceId"},
          {text:"車両ナンバー",value:"linkedVehicleNumber"},
          {text:"運転手名",value:"linkedDriverName"},
          {text:"出荷時刻",value:"departureTime"},
          {text:"出荷温度（℃)",value:"departureTemperature"},
          {text:"到着時刻",value:"arrivalTime"},
          {text:"最新温度（℃)",value:"latestTemperature"},
          {text:"温度推移グラフ",value:""},
        ],
        items:[],
        graphHeaders:[
          {text:"ID",value:"id"},
          {text:"デバイスID",value:"number"},
          {text:"受信時刻",value:"time"},
          {text:"温度",value:"temperature"},
        ],
        graphItems:[
          {id:"1-23",number:"12-34",time:"2020/09/14 08:00:00",temperature:85},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:05:00",temperature:70},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:10:00",temperature:60},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:15:00",temperature:50},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:20:00",temperature:40},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:25:00",temperature:30},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:30:00",temperature:20},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:35:00",temperature:10},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:40:00",temperature:5},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:45:00",temperature:0},
          {id:"1-23",number:"12-34",time:"2020/09/14 08:50:00",temperature:45},
        ],
        targetYM:"",
        prevIcon:'mdi-arrow-left',
        nextIcon:'mdi-arrow-right',
        page:1,
        pageCount:2,
        pagination: {
                sortBy: 'time',
                descending: true,
                rowsPerPage: -1,
        },
        load:false,
        dialog: false,
        datacollection: null,
      	data : {
          labels : ["08:00", "08:05", "08:10", "08:15", "08:20","08:25","08:30","08:35","08:40","08:45","08:50"],
          datasets:[
            {
              width:"80%",
              height:"120px",
              fill:false,
              borderColor:"offwhite",
              borderWidth:5,
              pointHoverBorderWidth:7,
              label:"",
              pointRadius:7,
              pointBackgroundColor:[],
              pointBorderColor:[],
              pointBorderWidth:3,
              data : [85,70,60,50,40,30,20,10,5,0,45],
            }
          ]
        },
        options:{
          scaleLabel:"時刻",
          legend: {
            display: false
          },
        },

    }),
    created(){
      this.items=[
            {date:"2020/9/13",linkedDeviceId:"1-23",linkedVehicleNumber:"12-34",linkedDriverName:"半沢　直樹",departureTime:"09:00",departureTemperature:"85",arrivalTime:"15:00",latestTemperature:"45"},
      ]
    },
    computed:{
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      }
    },
    mounted () {
      this.data.datasets[0].data.forEach(item =>{
        this.data.datasets[0].pointBorderColor.push(this.setThermographyColorCode(item))
        this.data.datasets[0].pointBackgroundColor.push("#FFFFFF")
      })
    },
    methods: {
      //温度に応じたカラーコードをセット
      setThermographyColorCode(val){
        console.log(val)
        if(val < 10){
          //黒
          return "#34495e"
        }else if(val < 20){
          //紫
          return "#9b59b6"
        }else if(val < 30){
          //青
          return "#3498db"
        }else if(val < 40){
          //緑
          return "#2ecc71"
        }else if(val < 50){
          //黄色
          return "#f1c40f"
        }else if(val < 60){
          //オレンジ
          return "#e67e22"
        }else{
          //赤
          return "#e74c3c"          
        }
      },
      //ダイアログを開く
      openDialog(){
        this.dialog = true;
      },
      closeDialog(){
        this.dialog = false;
        document.getElementsByClassName('v-dialog--active')[0].scrollTop = 0
      },
    }
  }
</script>

<style scoped>
</style>
