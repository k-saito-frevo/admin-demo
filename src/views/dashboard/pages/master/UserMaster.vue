<template>
  <v-container id="usermaster" fluid tag="section">
    <base-material-card icon="mdi-card-account-details-outline" class="px-5 py-3">
        <div class="text-right">
            <v-btn v-if="!rowSelected" color="info"  fab small class="mb-2" @click.stop="add=true,del = false,dialog= true" >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn v-else-if="rowSelected" color="success"  fab small class="mb-2" @click.stop="add=true,del = false,dialog= true" >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="error" fab small class="mb-2" @click.stop="add = false,del=true,dialog= true"  >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </div>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{on,attrs}">
          </template>
          <v-card v-if="add">
            <v-card-title>
              <span class="headline">ユーザ追加</span>
            </v-card-title>
            <v-card-text class="ml-5">
              <v-container>
                <v-row>
                  <v-col cols="11" sm="8" md="8">
                    <v-text-field label="ID" v-model="textId"></v-text-field>
                  </v-col>
                  <v-col cols="1" sm="1"md="1"><span class="red--text font-weight-bold">*</span></v-col>
                </v-row>
                <v-row>
                  <v-col cols="11" sm="8" md="8">
                    <v-text-field label="名前" v-model="textName"></v-text-field>
                  </v-col>
                  <v-col cols="1" sm="1"md="1"><span class="red--text font-weight-bold">*</span></v-col>
                </v-row>
                <v-row>
                  <v-col cols="11" sm="8" md="8">
                    <v-select label="所属支店" :items="branchList" v-model="selectedBranch"></v-select>
                  </v-col>
                  <v-col cols="1" sm="1"md="1"><span class="red--text font-weight-bold">*</span></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions >
            <v-spacer></v-spacer>
              <v-btn  class="success" @click="save">
                  <v-icon>mdi-content-save-outline</v-icon>保存
              </v-btn>
              <v-btn  @click="close">キャンセル</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else-if="del">
            <v-card-title>
              <span class="headline">ユーザ削除</span>
            </v-card-title>
              <v-spacer></v-spacer>
            <v-card-text class="ml-5">
                ユーザを削除します。よろしいですか？
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  class="error" @click="save">
                  <v-icon>mdi-delete</v-icon>削除
              </v-btn>
              <v-btn  @click="close">キャンセル</v-btn>
            </v-card-actions>
          </v-card>          
        </v-dialog>
        <v-data-table :options="option"
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
            show-select
        >
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
  export default {
    name: 'UserMaster',
    data: () => ({
        headers:[],
        items:[],
        prevIcon:'mdi-arrow-left',
        nextIcon:'mdi-arrow-right',
        page:1,
        pageCount:2,
        load:false,
        dialog: false,
        branchList:[
            {value:null,text:""},
            {value:1,text:"test"},
            {value:2,text:"2"},
            {value:3,text:"tetset"},
            {value:4,text:"tetset"},
            {value:5,text:"tetset"},
            {value:6,text:"tetset"},
            {value:7,text:"tetset"},
            {value:8,text:"tetset"},
            {value:9,text:"tetset"},
            {value:100,text:"tetset"}
        ],
        add:false,
        edit:false,
        del:false,
        rowSelected:false,
        textId:"",
        textName:"",
        selectedBranch:"",
    }),
    created: function(){
        this.items=[
            {id:1,name:"test",branchName:"東京支店"},
            {id:1,name:"tes",branchName:"東京支店"},
            {id:1,name:"aest",branchName:"東京支店"},
            {id:14,name:"test",branchName:"東京支店"},
            {id:2,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
        ]
        this.headers=[
            {
                text: 'ID',
                value: 'id'
            },
            {
                text: '氏名',
                value: 'name'
            },
            {
                text: '所属支店',
                value: 'branchName'            
            },
            {
                text: '',
                value: ''
            }
        ]
    },
    methods:{
        //追加ボタン
        add: function(){
            this.dialog = true;
            this.add = true;
        },
        openDel: function(){
            this.dialog = true;
            this.del = true;
        },
        //ダイアログを閉じる
        close: function(){
            this.load = !this.load;
            this.dialog= false;
            this.rowSelected = !this.rowSelected
        },
        save: function(){
            let target = this.branchList.filter(item =>item.value ==this.selectedBranch)
            let inputed = {
                id: this.textId,
                name: this.textName,
                branchName:target[0]["text"]
            }
            this.items.push(inputed);
            //保存はここで
            this.dialog= false;  
            this.initDialog();          
        },
        //ダイアログの初期化
        initDialog:function(){
            this.textId = ""
            this.textName = ""
            this.selectedBranch = null
        }
    }
  }
</script>
