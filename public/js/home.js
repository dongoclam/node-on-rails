var videoRegex = /video\/*/;
var fileExtensionRegex = /\.[^/.]+$/;
var scrollbar, dropzone;

$(document).ready(function() {
  dropzone = new Dropzone("#dropzone", {
    url: "/",
    autoProcessQueue: false
  });

  dropzone.on("drop", function() {
    dropzone.files = [];
    if (scrollbar) scrollbar.destroy();
  });

  dropzone.on("addedfile", function(file) {
    if (!file.fullPath) file.fullPath = file.name;
    $(".dz-preview").remove();
  });

  dropzone.on("addedfiles", function() {
    setTimeout(function() {
      renderTreeFile();
      initScrollbar();
    }, 500);
  });
});

$(document).on("click", ".dropzone-panel", function() {
  $("#dropzone").click();
});

$(document).on("click", ".open-play-list", function() {
  $(this).toggleClass("close");
  $("#tree-file").toggleClass("open");
  if($("video").length) $("video").get(0).pause();
});

$(document).on("click", ".tree-link", function() {
  var $videoContainer = $("#video-container");
  var path = $(this).data("path");
  var videoFile = dropzone.files.find(file => file.fullPath == path);
  var subtitleFile = getVideoSubtitle(path);
  var videoSource = URL.createObjectURL(videoFile);
  var $videoTemplate = $(`<video controls>
                            <source src="${videoSource}">
                          </video>`);
  if (subtitleFile) {
    var subtitleSource = URL.createObjectURL(subtitleFile);
    var $subtitle = $(`<track src="${subtitleSource}" kind="subtitles">`);
    $videoTemplate.append($subtitle);
  }
  $(".tree li").removeClass("active");
  $(this).closest("li").addClass("active");
  $videoContainer.html($videoTemplate);
  $videoTemplate.get(0).play();
});

$(document).on("click", ".remove", function() {
  scrollbar.destroy();
  var $this = $(this);
  var $treeLink = $this.siblings(".tree-link");
  var path = $treeLink.data("path");
  var index = dropzone.files.findIndex(file => file.fullPath == path)
  dropzone.files.splice(index, 1);
  renderTreeFile();
  initScrollbar();
})

function initScrollbar() {
  scrollbar = Scrollbar.init(document.getElementById("tree-file-scroll"), {
    continuousScrolling: true,
    alwaysShowTracks: false
  });
}

function videoFiles() {
  return dropzone.files.filter(file => videoRegex.test(file.type))
              .sort((a, b) => (a.name > b.name ? 1 : -1));
}

function getVideoSubtitle(path) {
  var filename = getFileName(path);

  return dropzone.files.find(file => {
    return file.fullPath != path && getFileName(file.fullPath) == filename;
  });
}

function renderTreeFile() {
  var videos = videoFiles();
  var filePaths = videos.map(file => file.fullPath);
  var treeList = loadTreeList(filePaths);
  var treeFiles = loadTreeFiles(treeList);
  var sortedTreeFiles = sortTreeFiles(treeFiles);
  $("#tree-file-scroll").html(fileHTML(sortedTreeFiles));
  $("#tree-file").addClass("open");
  $(".open-play-list").removeClass("d-none");
  $(".playlist-count").html(videos.length);
}

function fileHTML() {
  var $partial = $("<ul class='tree'></ul>");
  videoFiles().forEach((video, index) => {
    var $videoPartial = $(
      `<li><span>${index + 1}</span><a class="tree-link" data-path="${
        video.fullPath
      }">${getFileName(
        video.name
      )}</a><span class="remove"><i class="fal fa-times"></i></span></li>`
    );
    $partial.append($videoPartial);
  });

  return $partial;
}

function treeFileHTML(treeFiles) {
  var $partial = $("<ul class='tree'></ul>");

  treeFiles.forEach(tree => {
    if (tree.path) {
      var $treeTitle = $(
        `<li><a class="tree-link" data-path="${tree.path}">${
          tree.text
        }</a><span class="remove"><i class="fal fa-times"></i></span></li>`
      );
    } else {
      var $treeTitle = $(`<li><a class="tree-title">${tree.text}</a></li>`);
    }
    if (tree.nodes) $treeTitle.append(treeFileHTML(tree.nodes));
    $partial.append($treeTitle);
  });

  return $partial;
}

function sortTreeFiles(treeFiles) {
  treeFiles.sort((a, b) => {
    if (a.nodes && !b.nodes) {
      return -1;
    } else if (!a.nodes && b.nodes) {
      return 1;
    } else {
      return a.text > b.text ? 1 : -1;
    }
  });

  treeFiles.forEach(tree => {
    if (tree.nodes) sortTreeFiles(tree.nodes);
  });

  return treeFiles;
}

function loadTreeFiles(arrFile, result = []) {
  arrFile.forEach(subArrFile => {
    var sameLevelTree = result.find(element => {
      return element.text == subArrFile.text;
    });

    if (sameLevelTree && sameLevelTree.nodes && subArrFile.nodes) {
      sameLevelTree.nodes = loadTreeFiles(
        sameLevelTree.nodes,
        subArrFile.nodes
      );
    } else {
      result.push(subArrFile);
    }
  });

  return result;
}

function loadTreeList(filePaths) {
  return filePaths.map(path => {
    var splitedPath = path.split("/");
    return pathToTree(splitedPath, path);
  });
}

function pathToTree(splitedPath, path) {
  if (splitedPath.length > 1) {
    return {
      text: splitedPath.shift(),
      nodes: [pathToTree(splitedPath, path)]
    };
  } else {
    return { text: splitedPath.shift(), path: path };
  }
}

function getFileName(fileName) {
  return fileName.replace(fileExtensionRegex, "");
}

function uploadFile() {
  var file = dropzone.files[0];
  var data = new FormData();
  data.append("sourceFile", file);

  $.ajax({
    url: "/upload",
    method: "POST",
    data: data,
    contentType: false,
    processData: false,
    success: function(response) {
      console.log(response);
    }
  });
}
