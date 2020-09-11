<template>
  <v-container id="usermaster" fluid tag="section">
    <base-material-card icon="mdi-card-account-details-outline" class="px-5 py-3">
        <div class="text-right">
            <v-btn v-if="!rowSelected" color="info"  fab small class="mb-2" @click="openAddForm" >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn v-else-if="rowSelected" color="success"  fab small class="mb-2" @click="openEditForm" >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="error" :disabled="selectedRowInfo.length==0" fab small class="mb-2" @click="openDelForm"  >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </div>
        <v-dialog v-model="dialog" max-width="600px">
            
          <template v-slot:activator="{on,attrs}">
          </template>
            <v-card v-if="!del">
                <v-form>
                    <v-card-title>
                    <span class="headline" v-if="add">ユーザ追加</span>
                    <span class="headline" v-else>ユーザ編集</span>
                    </v-card-title>
                    <v-card-text class="ml-5">
                    <v-container>
                        <v-row>
                        <v-col cols="11" sm="8" md="8">
                            <v-text-field label="ID" v-model="textId" :rules="[required]"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="1"md="1"><span class="red--text font-weight-bold">*</span></v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="11" sm="8" md="8">
                            <v-text-field label="名前" v-model="textName" :rules="[required]"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="1"md="1"><span class="red--text font-weight-bold">*</span></v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="11" sm="8" md="8">
                            <v-select label="所属支店" :items="branchList" v-model="selectedBranch" :rules="[required]"></v-select>
                        </v-col>
                        <v-col cols="1" sm="1"md="1"><span class="red--text font-weight-bold">*</span></v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn  class="info" @click="save" v-if="add">
                        <v-icon>mdi-content-save-outline</v-icon>保存
                    </v-btn>
                    <v-btn  class="primary" @click="update" v-else>
                        <v-icon>mdi-content-save-outline</v-icon>更新
                    </v-btn>
                    <v-btn  @click="cansel">キャンセル</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
            <v-card v-else-if="del">
                <v-form>
                    <v-card-title>
                    <span class="headline">ユーザ削除</span>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-text class="ml-5">
                        ユーザ を削除します。この処理は戻せませんがよろしいですか？
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  class="error" @click="deletes">
                        <v-icon>mdi-delete</v-icon>削除
                    </v-btn>
                    <v-btn  @click="cansel">キャンセル</v-btn>
                    </v-card-actions>
                </v-form>
          </v-card>          
        </v-dialog>
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
            <tr :class="filterSelectedRowInfoById(item) ?'green lighten-5':''" @click="rowClicked(item)">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.branchName}}</td>
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
        selectedRowInfo:[],
        textId:"",
        textName:"",
        selectedBranch:"",
        delTarget:{},
        required: value => !!value || "入力してください", // 入力必須の制約
        limit_length: value => value.length <= 10 || "10文字以内で入力してください" // 文字数の制約        
    }),
    created: function(){
        this.headers=[
            {text: '従業員番号',value: 'id'},
            {text: '氏名',value: 'name'},
            {text: '所属支店',value: 'branchName'},
        ]
        this.items=[
            {id:1,name:"test",branchId:1,branchName:"東京支店"},
            {id:2,name:"tes",branchId:1,branchName:"東京支店"},
            {id:3,name:"aest",branchId:1,branchName:"東京支店"},
            {id:4,name:"test",branchId:1,branchName:"東京支店"},
            {id:32,name:"test",branchId:1,branchName:"東京支店"},
            {id:119,name:"test",branchId:1,branchName:"東京支店"},
            {id:19,name:"test",branchId:1,branchName:"東京支店"},
            {id:11,name:"test",branchId:1,branchName:"東京支店"},
            {id:219,name:"test",branchId:1,branchName:"東京支店"},
            {id:419,name:"test",branchId:1,branchName:"東京支店"},
            {id:1519,name:"test",branchId:1,branchName:"東京支店"},
        ]
    },
    methods:{
        //ボタン制御
        btnFlg(trueKey){
            switch(trueKey){
                case "add":
                    this.add = true
                    this.edit = false
                    this.del = false
                    break
                case "edit":
                    this.add = false
                    this.edit = true
                    this.del = false
                    break
                case "del":
                    this.add = false
                    this.edit = false
                    this.del = true
                    break
            }                    
        },
        //追加ボタン
        openAddForm(){
            this.initDialog()
            this.btnFlg("add")
            this.dialog = true;
        },
        //編集ボタン
        openEditForm(){
            this.btnFlg("edit")
            let target = this.selectedRowInfo[0]
            this.textId = target.id
            this.textName = target.name
            this.selectedBranch = target.branchId
            this.dialog = true;
        },
        openDelForm(){
            this.btnFlg("del")
            this.delTarget = this.selectedRowInfo[0]
            this.dialog = true;
        },
        //ダイアログを閉じる
        cansel(){
            this.dialog= false;
        },
        //登録更新
        save(){
            let target = this.branchList.filter(item =>item.value ==this.selectedBranch)
            let targetBranchId,targetBranchName ;
            if (target.length !=0){
                targetBranchId = target[0]["value"]
                targetBranchName = target[0]["text"]
            }
            let inputData = {
                id: this.textId,
                name: this.textName,
                branchId:targetBranchId,
                branchName:targetBranchName
            }
            //本来はここでajax処理
            this.items.unshift(inputData);
            this.selectedRowInfo.splice(0)
            this.dialog= false;  
            this.initDialog();          
        },
        update(){
            this.dialog= false;  
        },
        //削除
        deletes(){
            //本来はここでajax処理
            let place = this.items.indexOf(this.selectedRowInfo[0]);
            if( place !=-1 ) {
                this.items.shift(place,1)
            }
            this.selectedRow = false
            this.dialog= false;  
        },
        //ダイアログの初期化
        initDialog(){
            this.textId = ""
            this.textName = ""
            this.selectedBranch = null
        },
        //行選択時
        rowClicked(row) {
            //選択行情報を取得
            let filterdSelectedRowInfo = this.selectedRowInfo.filter(item => item.id == row.id)
            //被選択をクリア
            this.selectedRowInfo.splice(0)            
            //選択行がない場合
            if (filterdSelectedRowInfo.length == 0) this.selectedRowInfo.push(row)
            //ボタン制御
            this.selectedRowInfo.length>0 ? this.rowSelected = true : this.rowSelected = false
        },
        //選択行をIDでフィルター
        filterSelectedRowInfoById(item){
            return this.selectedRowInfo.filter(target => target.id == item.id).length>0
        }
    }
  }
</script>
