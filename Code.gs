function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate();

}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function newSpreadsheet() {
  var folder_name = "Sample";
  var dropbox = 'Google Apps Script';
  var folder = DriveApp.getFoldersByName(dropbox).next();
  var newFolder = folder.createFolder(folder_name);
  var folder_id = newFolder.getId();
  var ss_new = SpreadsheetApp.create("Sample");
  var ss_new_id = ss_new.getId();
  var newFile = DriveApp.getFileById(ss_new_id);
  newFile.moveTo(DriveApp.getFolderById(folder_id));

}

function uploadFiles(form) {

  try {

    var name = form.myName;
    var email = form.myEmail;
    var company = form.myCompany;
    var pumpType = form.pumpType;
    var pumpId = form.pumpId;
    var pumpRPM = form.pumpRPM;
    var pumpLastMain = form.pumpLastMain;
    var mainCycle = form.mainCycle;
    var value3a = form.value3a;
    var value3b = form.value3b;
    var value3c = form.value3c;

    list = [name, email, company].join(' ');
    var dropbox = 'Google Apps Script';
    var folder_name = list;
    var folder = DriveApp.getFoldersByName(dropbox).next();
    var newFolder = folder.createFolder(folder_name);
    var newFolderID = newFolder.getId();
    var ss_new = SpreadsheetApp.create("EHQ Report");
    var ss_new_id = ss_new.getId();
    var newFile = DriveApp.getFileById(ss_new_id);
    newFile.moveTo(DriveApp.getFolderById(newFolderID));

    ss_new.insertSheet("Client Information");
    var activesheet = ss_new.getSheetByName("Client Information");
    var oldSheet = ss_new.getSheetByName('Sheet1');
    ss_new.deleteSheet(oldSheet);
    activesheet.getRange(1, 1).setValue('Client Name ' + name);
    activesheet.getRange(2, 1).setValue('Client Email ' + email);
    activesheet.getRange(3, 1).setValue('Client Company ' + company);

    activesheet.getRange(4, 1).setValue('Pump Information');
    activesheet.getRange(5, 1).setValue('Pump Type');
    activesheet.getRange(5, 2).setValue(pumpType);
    activesheet.getRange(6, 1).setValue('Pump ID');
    activesheet.getRange(6, 2).setValue(pumpId);
    activesheet.getRange(7, 1).setValue('Pump RPM');
    activesheet.getRange(7, 2).setValue(pumpRPM);
    activesheet.getRange(8, 1).setValue('Last Maintenance Date');
    activesheet.getRange(8, 2).setValue(pumpLastMain);
    activesheet.getRange(9, 1).setValue('Maintenance Interval');
    activesheet.getRange(9, 2).setValue(mainCycle);

    activesheet.getRange(10, 1).setValue('Fault Questions');
    activesheet.getRange(11, 1).setValue('Please state the nature of the vibration?');
    activesheet.getRange(11, 2).setValue(value3a);
    activesheet.getRange(12, 1).setValue('During which operation status will excessive vibration be present?');
    activesheet.getRange(12, 2).setValue(value3b);
    activesheet.getRange(13, 1).setValue('Does the vibration come with excessive noise?');
    activesheet.getRange(13, 2).setValue(value3c);

    var blob = form.myFile;
    var file = newFolder.createFile(blob);
    file.setDescription("Motor Drive End Data");

    var blob2 = form.myFile2;
    var file = newFolder.createFile(blob2);
    file.setDescription("Motor Driven End Data");

    var blob3 = form.myFile3;
    var file = newFolder.createFile(blob3);
    file.setDescription("Pump Drive End Data");

    var blob4 = form.myFile4
    var file = newFolder.createFile(blob4);
    file.setDescription("Pump Driven End Data");
    return "File uploaded successfully " + file.getUrl() + ". Our engineers are working on your case and will get back to you in 1 week time. If you have any changes to the information provided, drop us an email at services@adzaan.com.sg with your name, company name and email address in the main email body. Thank you and see you in 1 week time!";

  } catch (error) {

    return error.toString();
  }

}
