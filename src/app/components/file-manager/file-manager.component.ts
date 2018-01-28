import { Component, OnInit } from '@angular/core';
import { User } from "../../dataModel/User";
import { UserService } from './../../infrastructure/services/webAPI/user.service';
import { DialogDisplayService } from "../../infrastructure/services/clientAPI/dialog-display.service";
import { TreeNode } from "primeng/primeng";

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})

export class FileManagerComponent implements OnInit {
    
    currentUser: User;
    filesTreeD: TreeNode[];     //drive D
    filesTreeC: TreeNode[];     //drive C
    selectedFilesD: TreeNode;
    selectedFilesC: TreeNode;

    tempC: TreeNode;    //keeps D drive selected folders
    tempD: TreeNode;    //keeps C drive selected fodlers
    temp: TreeNode;     //temp var

    constructor(
      public _userService: UserService,        
      public _dialogDisplayService: DialogDisplayService
    ){ 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));          
    }

    ngOnInit() {
        this.loadDriveC();
        this.loadDriveD();
    }

    //Select and Unselect node functions
    nodeSelect(event, driveName) {
        if(driveName == "driveC"){
            this.tempD = event.node;   
        }else if(driveName == "driveD"){
            this.tempC = event.node;   
        }else{
            alert("NO DRIVE");
        }
    }
    nodeUnSelect(event, driveName) {
        if(driveName == "driveC"){
            this.selectedFilesD = null;
            this.tempD = null;   
        }else if(driveName == "driveD"){
            this.selectedFilesC = null;
            this.tempC = null;   
        }else{
            alert("NO DRIVE");
        }
    }

    /******** COPY OPERATION ********/

    //Copy from folder/subfolder to folder/subfolder between drives
    copyItem(selectedFiles: TreeNode, temp: TreeNode, driveName:string){        
        if(selectedFiles.children.length != 0 && driveName == "driveC"){ 
            selectedFiles.children.push(temp);
        }else if(selectedFiles.children.length != 0 && driveName == "driveD"){
            selectedFiles.children.push(temp);
        }else{
            alert("CAN'T COPY to a file!");
        }
    }

    //Copy from drive to drive FIRST LEVEL
    copyItemFirstLevel(selectedFiles: TreeNode, temp: TreeNode, driveName:string){
        if(temp.children){
            if(driveName == "driveC"){
                this.filesTreeC.push(temp);                
            }else if(driveName == "driveD"){
                this.filesTreeD.push(temp);                
            }else{
                alert("NO DRIVE");
            }
        }  
    }

    //Copy within a drive
    copyItemWithin(selectedFiles: TreeNode, temp: TreeNode, driveName:string){
        if(driveName == "driveD"){
            this.filesTreeD.push(temp);            
        }else if(driveName == "driveC"){
            this.filesTreeC.push(temp);            
        }else{
            alert("NO DRIVE");
        }
    }

 
    /******** MOVE OPERATION ********/

    //FROM folder/subfolder to folder/subfolder: DEEP LEVELS                                
    moveItem(selectedFiles: TreeNode, temp: TreeNode, driveName:string){
        if(selectedFiles.children.length != 0){
            selectedFiles.children.push(temp);
            if(typeof temp.parent !== "undefined"){
                var tempChildren = temp.parent.children;
                for(var i = 0; i < tempChildren.length; i++){
                    if(tempChildren[i].label == temp.label){
                        tempChildren = tempChildren.filter(function(el) {
                            return el !== temp;
                        });
                    }
                }
            }else{
                //moviong from D to C
                console.log("No Parent");
                if(driveName == "driveC"){
                    this.filesTreeD = this.filesTreeD.filter(function(el) {
                        return el !== temp;
                    });
                //moviong from C to D
                }else if(driveName == "driveD"){
                    this.filesTreeC = this.filesTreeC.filter(function(el) {
                        return el !== temp;
                    });
                }
            }
        }else{
            alert("CAN'T MOVE to a file!");
        }
    }

    //FROM folder/subfolder to DRIVE directly: FIRST LEVEL                                  
    moveItemFirstLevel(selectedFiles: TreeNode, temp: TreeNode, driveName:string){           
        //Move from D to C
        if(driveName == "driveC"){
            this.filesTreeC.push(temp); 
            this.filesTreeD = this.filesTreeD.filter(function(el) {
                return el !== temp;
            });   
        //Move from C to D
        }else if(driveName == "driveD"){
            this.filesTreeD.push(temp); 
            this.filesTreeC = this.filesTreeC.filter(function(el) {
                return el !== temp;
            });   
        }
    }

    //Delete
    deleteItem(selectedFiles: TreeNode, driveName:string){          
        if(selectedFiles.parent){            
            selectedFiles.parent.children = selectedFiles.parent.children.filter(function(el) {
                return el !== selectedFiles;
            });   
        }else{
            if(driveName == "driveD"){
                this.filesTreeD = this.filesTreeD.filter(function(el) {
                    return el !== selectedFiles;
                }); 
            }else if(driveName == "driveC"){
                this.filesTreeC = this.filesTreeC.filter(function(el) {
                    return el !== selectedFiles;
                }); 
            }
        }    
    }

    //load Drives
    loadDriveC(){
        this.filesTreeC = [
            {
                label: 'Documents',
                data: 'Documents Folder',
                expandedIcon: 'fa-folder-open',
                collapsedIcon: 'fa-folder',
                children: [
                    {
                        label: 'Work',
                        data: 'Work Folder',
                        expandedIcon: 'fa-folder-open',
                        collapsedIcon: 'fa-folder',
                        children: [
                            {
                                label: 'Expenses.doc',
                                icon: 'fa-file-word-o',
                                data: 'Expenses Document',
                                children:[]
                            },
                            {
                                label: 'Resume.doc',
                                icon: 'fa-file-word-o',
                                data: 'Resume Document',
                                children:[]
                            }
                        ]
                    },
                    {
                        label: 'Home',
                        data: 'Home Folder',
                        expandedIcon: 'fa-folder-open',
                        collapsedIcon: 'fa-folder',
                        children: [
                            {
                                label: 'Invoices.txt',
                                icon: 'fa-file-word-o',
                                data: 'Invoices for this month',
                                children:[]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Pictures',
                data: 'Pictures Folder',
                expandedIcon: 'fa-folder-open',
                collapsedIcon: 'fa-folder',
                children: [
                    {
                        label: 'barcelona.jpg',
                        icon: 'fa-file-image-o',
                        data: 'Barcelona Photo',
                        children:[]
                    },
                    {
                        label: 'logo.jpg',
                        icon: 'fa-file-image-o',
                        data: 'PrimeFaces Logo',
                        children:[]
                    },
                    {
                        label: 'primeui.png',
                        icon: 'fa-file-image-o',
                        data: 'PrimeUI Logo',
                        children:[]
                    }
                ]
            },
            {
                label: 'Movies',
                data: 'Movies Folder',
                expandedIcon: 'fa-folder-open',
                collapsedIcon: 'fa-folder',
                children: [
                    {
                        label: 'Al Pacino',
                        data: 'Pacino Movies',
                        children: [
                            {
                                label: 'Scarface',
                                icon: 'fa-file-video-o',
                                data: 'Scarface Movie',
                                children:[]
                            },
                            {
                                label: 'Serpico',
                                icon: 'fa-file-video-o',
                                data: 'Serpico Movie',
                                children:[]
                            }
                        ]
                    },
                    {
                        label: 'Robert De Niro',
                        data: 'De Niro Movies',
                        children: [
                            {
                                label: 'Goodfellas',
                                icon: 'fa-file-video-o',
                                data: 'Goodfellas Movie',
                                children:[]
                            },
                            {
                                label: 'Untouchables',
                                icon: 'fa-file-video-o',
                                data: 'Untouchables Movie',
                                children:[]
                            }
                        ]
                    }
                ]
            }
        ];
    }
    loadDriveD(){
        this.filesTreeD = [
            {
                label: 'Resume.doc',
                icon: 'fa-file-word-o',
                data: 'Resume Document',
                children:[]
            },
            {
                label: 'Libra',
                data: 'Libra Folder',
                expandedIcon: 'fa-folder-open',
                collapsedIcon: 'fa-folder',
                children: [
                    {
                        label: 'Pune',
                        data: 'Pune Folder',
                        expandedIcon: 'fa-folder-open',
                        collapsedIcon: 'fa-folder',
                        children: [
                            {
                                label: 'Shpenzime.doc',
                                icon: 'fa-file-word-o',
                                data: 'Shpenzime Document',
                                children:[]
                            },
                            {
                                label: 'Resume.doc',
                                icon: 'fa-file-word-o',
                                data: 'Resume Document',
                                children:[]
                            }
                        ]
                    },
                    {
                        label: 'Home',
                        data: 'Home Folder',
                        expandedIcon: 'fa-folder-open',
                        collapsedIcon: 'fa-folder',
                        children: [
                            {
                                label: 'Invoices.txt',
                                icon: 'fa-file-word-o',
                                data: 'Invoices for this month',
                                children:[]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Vertetime',
                data: 'Vertetime Folder',
                expandedIcon: 'fa-folder-open',
                collapsedIcon: 'fa-folder',
                children: [
                    {
                        label: 'barcelona.jpg',
                        icon: 'fa-file-image-o',
                        data: 'Egnis Photo',
                        children:[]
                    },
                    {
                        label: 'logo.jpg',
                        icon: 'fa-file-image-o',
                        data: 'My Logo',
                        children:[]
                    },
                    {
                        label: 'primeui.png',
                        icon: 'fa-file-image-o',
                        data: 'Your Logo',
                        children:[]
                    }
                ]
            },
            {
                label: 'Diploma',
                data: 'Diploma Folder',
                expandedIcon: 'fa-folder-open',
                collapsedIcon: 'fa-folder',
                children: [
                    {
                        label: 'Hopkins',
                        data: 'Hopkins Movies',
                        children: [
                            {
                                label: 'Slade',
                                icon: 'fa-file-video-o',
                                data: 'Slade Movie',
                                children:[]
                            },
                            {
                                label: 'Serpent',
                                icon: 'fa-file-video-o',
                                data: 'Serpent Movie',
                                children:[]
                            }
                        ]
                    },
                    {
                        label: 'Fabrizio De Angelis',
                        data: 'De Angelis Movies',
                        children: [
                            {
                                label: 'Friends',
                                icon: 'fa-file-video-o',
                                data: 'Friends Movie',
                                children:[]
                            },
                            {
                                label: 'Leschtis',
                                icon: 'fa-file-video-o',
                                data: 'Leschtis Movie',
                                children:[]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
