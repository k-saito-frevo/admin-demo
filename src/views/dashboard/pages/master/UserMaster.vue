<template>
  <v-container id="usermaster" fluid tag="section">
    <base-material-card icon="mdi-card-account-details-outline" class="px-5 py-3">
        <div class="text-right">
        <v-spacer></v-spacer>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn  color="warning"  fab small class="mb-2 ml-5" @click="openCsvDialog"  v-bind="attrs" v-on="on">
                    <v-icon>mdi-file-document-outline</v-icon>
                </v-btn>
            </template>
            <span>CSV</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="!rowSelected" color="info"  fab small class="mb-2" @click="openAddForm" v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn v-else-if="rowSelected" color="success"  fab small class="mb-2" @click="openEditForm" v-bind="attrs" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>                
            </template>
            <span v-if="!rowSelected">追加</span>
            <span v-else-if="rowSelected">編集</span>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">         
                <v-btn color="error" :disabled="selectedRowInfo.length==0" fab small class="mb-2" @click="openDelForm" v-bind="attrs" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
            <span>削除</span>
        </v-tooltip>
        </div>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{on,attrs}">
          </template>
            <v-card v-if="csv">
                <v-form>
                    <v-card-title>
                        <span class="headline">CSV</span>
                    </v-card-title>
                    <v-card-text class="ml-5">
                    <v-tabs v-model="csvTab" style="width:100%">
                        <v-tab href="#0">アップロード</v-tab>
                        <v-tab href="#1">ダウンロード</v-tab>
                    </v-tabs>
                    <v-container>
                        <v-tabs-items v-model="csvTab">
                            <v-tab-item value="0">
                                <v-row>
                                <v-col cols="11" sm="8" md="8">
                                    <v-file-input label="CSVファイルを選択してください" v-model="targetUploadCSV"></v-file-input>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn class="info" @click="uploadCsv"><v-icon>mdi-cloud-upload</v-icon>アップロード</v-btn>
                                </v-col>
                                </v-row>                                
                            </v-tab-item>
                            <v-tab-item value="1">
                                <v-row>
                                <v-col cols="11" sm="8" md="8">
                                    <v-btn class="info" @click="downloadCsv"><v-icon>mdi-cloud-download</v-icon>ダウンロード</v-btn>
                                </v-col>
                                </v-row>                                
                            </v-tab-item>
                        </v-tabs-items>                    
                    </v-container>
                    </v-card-text>
                    <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn  @click="cansel">キャンセル</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
            <v-card v-else-if="!del">
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
        csv:false,
        csvTab:0,
        targetUploadCSV:0,
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
                case "csv":
                    this.csv = true
                    this.add = false
                    this.edit = false
                    this.del = false
                    break
                case "add":
                    this.csv = false
                    this.add = true
                    this.edit = false
                    this.del = false
                    break
                case "edit":
                    this.csv = false
                    this.add = false
                    this.edit = true
                    this.del = false
                    break
                case "del":
                    this.csv = false
                    this.add = false
                    this.edit = false
                    this.del = true
                    break
            }                    
        },
        //CSVダイアログボタン
        openCsvDialog(){
            this.csvTab = 0
            this.btnFlg("csv")
            this.dialog = true
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
        //アップロードCSV
        uploadCsv(){
            this.getFileContent(this.targetUploadCSV)
        },
        //ファイル内容を出力
        async getFileContent (file) {
            try {
                const content = await this.readFileAsync(file)
                console.log(content)
            } catch (e) {
                console.log(e)
            }
        },
        //ファイル内容読み込み
        readFileAsync (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => {
                resolve(reader.result)
                }
                reader.onerror = reject
                reader.readAsText(file)
            })
        },
        //ダウンロードCSV
        downloadCsv(){
            var csv = '\ufeff' + '従業員番号,氏名,支店番号,支店\n'
            this.items.forEach(item => {
                var line = item['id'] + ',' + item['name'] + ',' + item['branchId'] + ',' + item['branchName'] + '\n'
                csv += line
            })
            let blob = new Blob([csv], { type: 'text/csv' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'test.csv'
            link.click()            
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
        },
        
    }
  }
</script>
