var DEFAULT_SRC = "";
var DEFAULT_USER_FOLDER = "/custommericons/";
var DEFAULT_EXTEND_ICON = ".png";
var DEFAULT_ICON_SRC = "/assets/images/favicons.png";
var PROTOCOL = ["http://", "https://"];
var HOME_PAGE = "http://home.vn/";
var EDIT_BOX_PROMPT_SITE_ID_FIELD = "#siteId";
var EDIT_BOX_PROMPT_SITE_URL_FIELD = "#_1_WAR_weblinksportlet_siteUrl";
var EDIT_BOX_PROMPT_SITE_NAME_FIELD = "#webSiteName";
var EDIT_BOX_PROMPT_BUTTON_ACCEPT = "#btnAcceptDesktop";
var EDIT_BOX_PROMPT_BUTTON_CANCEL = "#btnCancel";
var SHOW_BOX_PROMPT_BUTTON = "#showBoxprompt";
var EDIT_BOX_PROMPT_DIALOG = "#editBoxPromptDialog";
var EDIT_BOX_PROMPT_DIALOG_HEADER_TITLE = "#boxPromptDialogHeaderTitle";
var trackingViewURL = "";
var REMOVE_BOX_PROMPT_BUTTON_ACCEPT = "#btnRemoveAccept";
var REMOVE_BOX_PROMPT_BUTTON_CANCEL = "#btnRemoveCancel";
var REMOVE_BOX_PROMPT_SITE_ID_FIELD = "#siteRemoveId";
var REMOVE_BOX_PROMPT_SITE_NAME_FIELD = "#webSiteRemoveName";
var REMOVE_BOX_PROMPT_DIALOG = "#removeBoxPromptDialog";
var REMOVE_BOX_PROMPT_DIALOG_HEADER_TITLE = "#boxRemovePromptDialogHeaderTitle";
var CHANGE_BOX_PROMPT_DIALOG = "#changeBoxPromptDialog";
var CHANGE_BOX_PROMPT_BUTTON_CANCEL = "#change_btnCancel";
var CHANGE_BOX_PROMPT_BUTTON_ACCEPT = "#change_btnAccept";
var SYNC_DIALOG_BUTTON_ACCEPT = "#sync_btnAccept";
var SYNC_DIALOG_BUTTON_CANCEL = "#sync_btnCancel";
var SYNC_DIALOG = "#syncDialog";
var SYNC_DIALOG_HEADER_TITLE = "#syncDialogHeaderTitle";
var SYNC_DIALOG_DATA = "#syncHtmlData";
var logoutURL = "";
var logoutURLBeta = "";
var itemsData = [];
var currentId = "";
var countAction = 0;
var isEdit = false;
var manualSelectIcon = false;
var _hascttntf = getCookie("_hascttntf");
var _hascntf = getCookie("_hascntf");
var guideLoginNotify = '<span class="title"></span><span class="close" id="close-notify"></span><span class="content"><span style="float:left;width: 100%">- Bấm chuột, kéo thả để thay đổi vị trí</span><span style="float:left;width: 100%">- Bấm dấu + để thêm mới</span></span>';
var guideUserNotify = '<span class="close" id="close-notify"></span><span class="content" style="padding:0px"><span style="float:left;width: 100%">- Bấm chuột, kéo thả để thay đổi vị trí</span><span style="float:left;width: 100%">- Bấm dấu + để thêm mới</span><span style="float:left;width: 100%">- Có thể xoá, sửa các icon</span></span>';
var guideSetHomePageNotify = '<span class="title">Hướng dẫn đặt làm trang chủ và lưu bookmark</span><span class="close" id="close-notify"></span><span class="content"><span style="float:left;width: 100%">- Bấm chuột, kéo thả để thay đổi vị trí</span><span style="float:left;width: 100%"><a href="#" id ="set-homepage">- Bấm dấu + để thêm mới</a></span><span style="float:left;width: 100%"><a href="#" id ="set-bookmark">- Có thể xoá, sửa các icon</a></span></span>';
var option = {
    width: 198,
    items: [{
        text: "Mở website trong tab mới",
        icon: "/weblinks-portlet/images/contextmenu/newtab.png",
        alias: "openTab",
        action: menuAction,
        type: "ibody"
    }, {
        type: "splitLine"
    }, {
        text: "Sửa thông tin website",
        icon: "/weblinks-portlet/images/contextmenu/edit.png",
        alias: "edit",
        action: menuAction,
        type: "ibody"
    }, {
        text: "Xóa địa chỉ website",
        icon: "/weblinks-portlet/images/contextmenu/remove.png",
        alias: "remove",
        action: menuAction,
        type: "ibody"
    }, {
        text: "Đổi ảnh đại diện",
        icon: "/weblinks-portlet/images/contextmenu/change-icon.png",
        alias: "change",
        action: menuAction,
        type: "ibody"
    }],
    onShow: applyrule
};
AUI().use("liferay-portlet-url", function(a) {
    trackingViewURL = Liferay.PortletURL.createActionURL();
    trackingViewURL.setParameter("javax.portlet.action", "trackingUserView");
    trackingViewURL.setPortletId("missingicons_WAR_weblinksportlet");
    trackingViewURL.setWindowState("normal")
});
var option2 = {
    width: 198,
    items: [{
        text: "Thêm mới website",
        icon: "/weblinks-portlet/images/contextmenu/newtab.png",
        alias: "createWebsite",
        action: menuAction,
        type: "ibody"
    }, {
        type: "splitLine"
    }, {
        text: "Sửa thông tin website",
        icon: "/weblinks-portlet/images/contextmenu/edit.png",
        alias: "edit",
        action: menuAction,
        type: "ibody"
    }, {
        text: "Xóa địa chỉ website",
        icon: "/weblinks-portlet/images/contextmenu/remove.png",
        alias: "remove",
        action: menuAction,
        type: "ibody"
    }],
    onShow: applyrule
};
$(function() {
    jQuery.contextMenu({
        selector: "#sortable-weblink",
        events: {
            show: function(a) {
                currentId = $(this).attr("id");
                $("#sortable li").removeClass("hover");
                $("#sortable li").removeClass("hoverEdit");
                $("#sortable li").removeClass("hoverRemove");
                $("#sortable li .remove-item1").addClass("remove-item");
                $("#sortable li .remove-item1").removeClass("remove-item1");
                $("#sortable li .edit-item1").addClass("edit-item");
                $("#sortable li .edit-item1").removeClass("edit-item1")
            }
        },
        callback: function(b, a) {
            if (b == "edit") {
                $("#sortable li").addClass("hover");
                $("#sortable li").addClass("hoverEdit");
                $("#sortable li .remove-item").addClass("remove-item1");
                $("#sortable li .remove-item").removeClass("remove-item")
            } else {
                if (b == "remove") {
                    $("#sortable li").addClass("hover");
                    $("#sortable li").addClass("hoverRemove");
                    $("#sortable li .edit-item").addClass("edit-item1");
                    $("#sortable li .edit-item").removeClass("edit-item")
                } else {
                    if (b == "createNew") {
                        displayEditSiteInfoDialog(jQuery(EDIT_BOX_PROMPT_DIALOG), "Thêm mới địa chỉ website", "")
                    }
                }
            }
        },
        items: {
            createNew: {
                name: "Thêm mới website",
                icon: "remove",
                accesskey: "n"
            },
            sep1: "---------",
            edit: {
                name: "Sửa thông tin website",
                icon: "edit",
                accesskey: "e"
            },
            remove: {
                name: "Xóa địa chỉ website",
                icon: "remove",
                accesskey: "r"
            }
        }
    })
});
var jdoLogin, isLogin, guestInstance, account, jdoSyn, jisFirstLoginisNewUser;
var isNewUser = false;

function applyrule(a) {
    currentId = this.id
}

function menuAction() {
    if (this.data.alias == "edit") {
        isEdit = true;
        var b = jQuery("#" + currentId).find("a").attr("href");
        var a = jQuery("#" + currentId).find("img").attr("alt");
        jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD).val(b);
        jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD).val(a);
        jQuery("#checkEditAdd").val("4");
        displayEditSiteInfoDialog(jQuery(EDIT_BOX_PROMPT_DIALOG), "Sửa thông tin website", currentId)
    } else {
        if (this.data.alias == "remove") {
            removeMenuSiteById(currentId)
        } else {
            if (this.data.alias == "openTab") {
                var b = jQuery("#" + currentId).find("a").attr("href");
                var c = window.open(b, "_blank");
                c.focus()
            } else {
                if (this.data.alias == "createWebsite") {
                    displayEditSiteInfoDialog(jQuery(EDIT_BOX_PROMPT_DIALOG), "Thêm mới địa chỉ website", "")
                } else {
                    jQuery("#image-position").val(currentId);
                    changeIconDialog(currentId)
                }
            }
        }
    }
}

function getMaxIndexOf(c, d) {
    var b = c.indexOf(d);
    var a = 1;
    while (c.indexOf(d, a) > -1) {
        b = c.indexOf(d, a);
        a = a + 1
    }
    return b
}

function initContextMenu(a) {
    var c = "";
    if (a != null && a.length > 0) {
        for (var b = 0; b < a.length; b++) {
            var d = a[b];
            jQuery(d).attr("id", b);
            c = c + "#" + b + ","
        }
        c = c.substring(0, c.length - 1);
        jQuery.contextMenu({
            selector: c,
            events: {
                show: function(f) {
                    currentId = $(this).attr("id");
                    $("#sortable li").removeClass("hover");
                    $("#sortable li").removeClass("hoverEdit");
                    $("#sortable li").removeClass("hoverRemove")
                }
            },
            callback: function(i, h) {
                if (i == "edit") {
                    isEdit = true;
                    var g = jQuery("#" + currentId).find("a").attr("href");
                    var f = jQuery("#" + currentId).find("img").attr("alt");
                    jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD).val(g);
                    jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD).val(f);
                    jQuery("#checkEditAdd").val("4");
                    displayEditSiteInfoDialog(jQuery(EDIT_BOX_PROMPT_DIALOG), "Sửa thông tin website", currentId)
                } else {
                    if (i == "remove") {
                        removeMenuSiteById(currentId)
                    } else {
                        if (i == "openTab") {
                            var g = jQuery("#" + currentId).find("a").attr("href");
                            var j = window.open(g, "_blank");
                            j.focus()
                        } else {
                            if (i == "createWebsite") {
                                displayEditSiteInfoDialog(jQuery(EDIT_BOX_PROMPT_DIALOG), "Thêm mới địa chỉ website", "")
                            } else {
                                jQuery("#image-position").val(currentId);
                                changeIconDialog(currentId)
                            }
                        }
                    }
                }
            },
            items: {
                openTab: {
                    name: "Mở website trong tab mới",
                    icon: "openTab",
                    accesskey: "o"
                },
                sep1: "---------",
                edit: {
                    name: "Sửa thông tin website",
                    icon: "edit",
                    accesskey: "e"
                },
                remove: {
                    name: "Xóa địa chỉ website",
                    icon: "remove",
                    accesskey: "r"
                },
                change: {
                    name: "Đổi ảnh đại diện",
                    icon: "changeIcon",
                    accesskey: "c"
                }
            },
            show: function(f) {
                currentId = f.selector.id
            }
        })
    }
}
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}
function addSiteInfo() {
    var n = jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD);
    var m = jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD);
    var b = jQuery(EDIT_BOX_PROMPT_SITE_ID_FIELD);
    var g = jQuery.trim(n.val()); //NAME
    var j = jQuery.trim(m.val()); //URL
    var d = jQuery.trim(b.val()); //ID
    var c = "";
    var l = DEFAULT_ICON_SRC;
    if (j.length == 0 || j == "http://" || j == "https://") {
        m.focus();
        return
    }
    if (j.length > 512) {
        alert("Địa chỉ website quá dài");
        m.focus();
        return
    }
    if (g.length == 0) {
        n.focus();
        return
    }
    if (g.length > 75) {
        g = g.substring(0, 74)
    }
    j = j.replace(/[^a-zA-Z0-9-?=&%_:.\/\s]/g, "");
    if (!checkProtocolURL(j)) {
        j = PROTOCOL[0] + j
    }
    j = j.toLowerCase();
    c = getHostNameFromURL(j);
    var k = c;
    k = k.toLowerCase();
    g = g.replace(/script/gi, "");
    g = g.replace(/alert/gi, "");
    g = g.replace(">", "");
    g = g.replace("<", "");
    g = g.replace(";", "");
    g = g.replace('"', "");
    g = g.replace('""', "");
    if (g.length == 0) {
        alert("Tên website không hợp lệ");
        return
    }
    var i = "https://www.google.com/s2/favicons?domain=" + extractDomain(j);
    l = i;
    if (d == "") {
        jQuery("#sortable").append('<li class="ui-state-default"><span class="item-content"><a href="' + j + '" class="item-href" target="_blank"><span class="item-icon"><img alt="' + g + '" src="' + l + '" height ="16px" width="16px" onerror="getDefaultImageSource(this,&quot;' + k + '&quot;)" alternate="' + i + '"></span><span class="item-name">' + g + '</span></a></span><span class="edit-item" onclick="editSite(this);"></span><span class="remove-item" onclick="removeSite(this);"></span></li>')
    } else {
        var f = parseInt(d);
        if (f >= 0) {
            jQuery("#" + currentId).find("a").attr("href", j);
            jQuery("#" + currentId).find("img").attr("alt", g);
            jQuery("#" + currentId).find("img").attr("src", l);
            jQuery("#" + currentId).find("img").attr("alternate", i);
            jQuery("#" + currentId).find("span .item-name").text(g)
        }
    }
    n.val("");
    m.val("");
    var h = jQuery("#sortable").children();
    initContextMenu(h);
    jQuery.unblockUI();
    var h = jQuery("#sortable").children();
    var a = jQuery("#checkEditAdd").val();
    sortAndUpdatePositions(h, a, j);
    countActionHandle()
}

function getIconToShow(b) {
    var a = "";
    jQuery.ajax({
        async: false,
        dataType: "text",
        type: "POST",
        url: checkAndGetIcon,
        cache: true,
        data: {
            weblinkURL: b
        },
        success: function(c) {
            a = c
        },
        error: function(c) {
            a = c
        }
    });
    return a
}

function activeFocus(a) {
    $(".mini-icon").click(function() {
        $(".select-icon-box").show();
        $(".txtSearchIcon").focus()
    });
    $("#_1_WAR_weblinksportlet_siteUrl").focusout(function() {
        var d = $(this).val();
        var c = new RegExp(/(^(((https|http|ftp):\/\/))(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$)|(^(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$)/g);
        if (c.test(jQuery("#_1_WAR_weblinksportlet_siteUrl").val())) {
            unfocusInputUrl();
            if (d.length == 0 || d == "http://" || d == "https://") {
                return
            }
            if (!checkProtocolURL(d)) {
                d = PROTOCOL[0] + d
            }
            d = d.toLowerCase();
            if ((d != a || a === "") && !manualSelectIcon) {
                var b = getIconToShow(d);
                jQuery("#iconNameOnAdd").val(b);
                $(".mini-icon").html("<img src='" + b + "'>")
            }
        } else {
            focusInputUrl()
        }
    })
}

function checkProtocolURL(a) {
    if (/^(http|https):\/\//m.test(a)) {
        return true
    } else {
        return false
    }
}

function checkWWWURL(a) {
    if (/(www.)/m.test(a)) {
        return true
    } else {
        return false
    }
}

function getHostNameFromURL(a) {
    var c = "";
    if (a) {
        if (!checkProtocolURL(a)) {
            a = PROTOCOL[0] + a
        }
        var b = document.createElement("a");
        b.href = a;
        c = b.hostname
    }
    return c
}

function imageExists(b) {
    var a = new XMLHttpRequest();
    a.open("HEAD", b, false);
    a.send();
    return a.status
}

function getDefaultImageSource(b, a) {
    if (a) {
        var c = DEFAULT_ICON_SRC;
        a = "_" + a;
        c = DEFAULT_SRC + a + DEFAULT_EXTEND_ICON;
        jQuery.ajax({
            url: c,
            type: "POST",
            success: function() {
                jQuery(b).attr("src", c)
            },
            error: function() {
                c = DEFAULT_ICON_SRC;
                jQuery(b).attr("src", c)
            }
        })
    } else {
        jQuery(b).attr("src", DEFAULT_ICON_SRC)
    }
}

function getImageSourcePathFromURL(a) {
    var d;
    if (a) {
        var b = document.createElement("a");
        b.href = a;
        var c = b.hostname;
        if (c) {
            if (c.indexOf("www.") == 0) {
                c = c.replace("www.", "")
            }
            d = DEFAULT_SRC + c + DEFAULT_EXTEND_ICON
        } else {
            d = DEFAULT_ICON_SRC
        }
    } else {
        d = DEFAULT_ICON_SRC
    }
    return d
}

function displayEditSiteInfoDialog(j, l, b) {
    var m = "30%";
    var c = jQuery(window).width();
    var n = j.width();
    var i = (c - n) / 2;
    var k = jQuery(EDIT_BOX_PROMPT_SITE_ID_FIELD);
    var g = jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD);
    var a = jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD);
    var f = jQuery(EDIT_BOX_PROMPT_DIALOG_HEADER_TITLE);
    var h = jQuery(EDIT_BOX_PROMPT_BUTTON_CANCEL);
    if (k) {
        k.val(b)
    }
    if (g) {
        if (jQuery.trim(g.val()) == "") {
            g.val("http://")
        }
    }
    g.focus();
    if (f) {
        f.empty();
        f.append(l)
    }
    h.click(function() {
        k.val("");
        g.val("");
        a.val("");
        jQuery.unblockUI();
        isEdit = false;
        manualSelectIcon = false
    });
    if (b === "") {
        $("#_1_WAR_weblinksportlet_siteUrl").off("focusout");
        activeFocus("");
        $(".mini-icon").html("<img src='" + DEFAULT_ICON_SRC + "'>");
        var d = DEFAULT_ICON_SRC.replace(DEFAULT_SRC, "");
        $("#iconNameOnAdd").val(d)
    } else {
        var o = jQuery("#" + b).find("img").attr("src");
        $(".mini-icon").html("<img src='" + o + "'>");
        $("#_1_WAR_weblinksportlet_siteUrl").off("focusout");
        activeFocus(g.val());
        var d = o.replace(DEFAULT_SRC, "");
        $("#iconNameOnAdd").val(d)
    }
    blockDialogUI(j, m, i)
}

function displayRemoveSiteInfoDialog(g, i, a) {
    var j = "30%";
    var b = jQuery(window).width();
    var k = g.width();
    var f = (b - k) / 2;
    var h = jQuery(REMOVE_BOX_PROMPT_SITE_ID_FIELD);
    var c = jQuery(REMOVE_BOX_PROMPT_DIALOG_HEADER_TITLE);
    var d = jQuery(REMOVE_BOX_PROMPT_BUTTON_CANCEL);
    if (h) {
        h.val(a)
    }
    if (c) {
        c.empty();
        c.append(i)
    }
    d.click(function() {
        h.val("");
        jQuery.unblockUI();
        isEdit = false;
        manualSelectIcon = false
    });
    if (a === "") {
        $("#icon-site-remove").attr("src", DEFAULT_ICON_SRC)
    } else {
        var l = jQuery("#" + a).find("img").attr("src");
        $("#icon-site-remove").attr("src", l)
    }
    blockDialogUI(g, j, f)
}
$(document).mouseup(function(b) {
    var a = $(".select-icon-box");
    if (!a.is(b.target) && a.has(b.target).length === 0) {
        $(a).hide()
    }
});

function displaySyncDialog(i) {
    var f = jQuery(SYNC_DIALOG);
    var j = "30%";
    var a = jQuery(window).width();
    var k = f.width();
    var d = (a - k) / 2;
    var b = jQuery(SYNC_DIALOG_HEADER_TITLE);
    var g = jQuery(SYNC_DIALOG_DATA).val();
    var c = jQuery(SYNC_DIALOG_BUTTON_CANCEL);
    var h = jQuery(SYNC_DIALOG_BUTTON_ACCEPT);
    h.click(function() {
        var l = jQuery("<ul><ul/>").html(g).children();
        syncData(l)
    });
    c.click(function() {
        var l = jQuery("#sortable").children();
        getPositions(l, 10)
    });
    if (b) {
        b.empty();
        b.append(i)
    }
    blockDialogUI(f, j, d)
}

function blockDialogUI(a, c, b) {
    jQuery.blockUI({
        message: a,
        css: {
            padding: 0,
            top: c,
            left: b,
            border: "none",
            cursor: "default",
            backgroundColor: "transparent"
        },
        focusInput: true
    })
}

function logTracking(c, b) {
    var a = jQuery(c).attr("href");
    jQuery.ajax({
        async: true,
        type: "POST",
        url: trackingViewURL,
        dataType: "text",
        contenttype: "application/json; charset=utf-8",
        data: {
            weblinkURL: a,
        },
        success: function(d) {},
        error: function(f, g, d) {}
    })
}

function customerTracking(a) {
    jQuery.ajax({
        async: true,
        type: "POST",
        url: customerTrackingURL,
        dataType: "json",
        contenttype: "application/json; charset=utf-8",
        data: {
            weblinkURL: a
        },
        success: function(b) {},
        error: function(c, d, b) {}
    })
}

function deleteTracking(a) {
    jQuery.ajax({
        async: true,
        type: "POST",
        url: trackingDeleteURL,
        dataType: "json",
        contenttype: "application/json; charset=utf-8",
        data: {
            weblinkURL: a
        },
        success: function(b) {},
    })
}

function getPositions(k, a) {
    itemsData = [];
    var b = "";
    if (k != null && k.length > 0) {
        for (var h = 0; h < k.length; h++) {
            var l = k[h];
            var c = jQuery(l).find("a").attr("href");
            var d = jQuery(l).find("img").attr("alt");
            var f = jQuery(l).find("img").attr("alternate");
            jQuery(l).attr("id", h);
            b = b + "#" + h + ",";
            var j = "ui-state-default";
            if (h % 9 == 0) {
                j = "ui-state-default-first"
            } else {
                if ((h + 1) % 9 == 0) {
                    j = "ui-state-default-last"
                } else {
                    j = "ui-state-default"
                }
            }
            jQuery(l).attr("class", j);
            var g = {
                id: h,
                url: c,
                name: d,
                alternate: f
            };
            itemsData.push(g)
        }
        b = b.substring(0, b.length - 1);
        jQuery(b).contextmenu(option)
    }
    getUpdatePositions(a)
}

function getUpdatePositions(b) {
    var a = {
        list: itemsData
    };
    jQuery.ajax({
        async: true,
        type: "POST",
        url: updatePositionsURL,
        dataType: "json",
        contenttype: "application/json; charset=utf-8",
        data: {
            data: JSON.stringify(a),
            actionId: b,
            logType: 1
        },
        success: function(c) {
            var f = c.guestInstance;
            if (f != undefined) {
                var d = new Date();
                d.setTime(d.getTime() + (1000 * 365 * 24 * 60 * 60));
                jQuery.cookie("guestInstance", f, {
                    expires: d
                })
            }
            jQuery(SYNC_DIALOG_DATA).val("");
            jQuery.unblockUI();
            window.location.href = HOME_PAGE
        },
        error: function(d, f, c) {}
    })
}

function sortAndUpdatePositions(l, a, f) {
    itemsData = [];
    var b = "";
    if (l != null && l.length > 0) {
        for (var j = 0; j < l.length; j++) {
            var m = l[j];
            var c = jQuery(m).find("a").attr("href");
            var d = jQuery(m).find("img").attr("alt");
            var g = jQuery(m).find("img").attr("alternate");
            jQuery(m).attr("id", j);
            b = b + "#" + j + ",";
            var k = "ui-state-default";
            if (j % 9 == 0) {
                k = "ui-state-default-first"
            } else {
                if ((j + 1) % 9 == 0) {
                    k = "ui-state-default-last"
                } else {
                    k = "ui-state-default"
                }
            }
            jQuery(m).attr("class", k);
            var h = {
                id: j,
                url: c,
                name: d,
                alternate: g
            };
            itemsData.push(h)
        }
        b = b.substring(0, b.length - 1);
        jQuery(b).contextmenu(option)
    }
    updatePositions(a, f)
}

function updatePositions(c, b) {
    var a = {
        list: itemsData
    };
    jQuery.ajax({
        async: true,
        type: "POST",
        url: updatePositionsURL,
        dataType: "json",
        contenttype: "application/json; charset=utf-8",
        data: {
            data: JSON.stringify(a),
            actionId: c,
            logType: 1,
            info: b
        },
        success: function(d) {
            var g = d.guestInstance;
            if (g != undefined) {
                var f = new Date();
                f.setTime(f.getTime() + (1000 * 365 * 24 * 60 * 60));
                jQuery.cookie("guestInstance", g, {
                    expires: f
                })
            }
        },
        error: function(f, g, d) {}
    })
}

function syncData(b) {
    itemsData = [];
    if (b != null && b.length > 0) {
        for (var g = 0; g < b.length; g++) {
            var h = b[g];
            var d = jQuery(h).find("a").attr("href");
            var c = jQuery(h).find("img").attr("alt");
            var j = jQuery(h).find("img").attr("alternate");
            jQuery(h).attr("id", g);
            var f = "ui-state-default";
            if (g % 9 == 0) {
                f = "ui-state-default-first"
            } else {
                if ((g + 1) % 9 == 0) {
                    f = "ui-state-default-last"
                } else {
                    f = "ui-state-default"
                }
            }
            jQuery(h).attr("class", f);
            var a = {
                id: g,
                url: d,
                name: c,
                alternate: j
            };
            itemsData.push(a)
        }
    }
    syncPositions()
}

function syncPositions() {
    var a = {
        list: itemsData
    };
    jQuery.ajax({
        type: "POST",
        url: updatePositionsURL,
        dataType: "json",
        contenttype: "application/json; charset=utf-8",
        data: {
            data: JSON.stringify(a)
        },
        success: function(b) {
            var d = b.guestInstance;
            if (d != undefined) {
                var c = new Date();
                c.setTime(c.getTime() + (1000 * 182 * 24 * 60 * 60));
                jQuery.cookie("guestInstance", d, {
                    expires: c
                });
                window.location.href = HOME_PAGE
            }
        },
        error: function(c, d, b) {}
    })
}

function editSite(d) {
    var a = jQuery(d).closest("li");
    var f = jQuery(a).attr("id");
    currentId = f;
    isEdit = true;
    var c = jQuery("#" + f).find("a").attr("href");
    var b = jQuery("#" + f).find("img").attr("alt");
    jQuery("#checkEditAdd").val("4");
    jQuery(EDIT_BOX_PROMPT_SITE_ID_FIELD).val(f);
    jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD).val(c);
    jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD).val(b);
    displayEditSiteInfoDialog(jQuery(EDIT_BOX_PROMPT_DIALOG), "Sửa thông tin website", f)
}

function removeSite(c) {
    var a = jQuery(c).closest("li");
    var d = jQuery(a).attr("id");
    var b = jQuery("#" + d).find("img").attr("alt");
    jQuery(REMOVE_BOX_PROMPT_SITE_ID_FIELD).val(d);
    jQuery(REMOVE_BOX_PROMPT_SITE_NAME_FIELD).html(b);
    displayRemoveSiteInfoDialog(jQuery(REMOVE_BOX_PROMPT_DIALOG), "Xóa địa chỉ website", d)
}

function clearNotify(b) {
    var a = jQuery(b);
    a.empty(300)
}

function removeSiteById(c) {
    var a = jQuery(e).closest("li");
    var c = jQuery(a).attr("id");
    var b = jQuery("#" + c).find("img").attr("alt");
    jQuery(REMOVE_BOX_PROMPT_SITE_ID_FIELD).val(c);
    jQuery(REMOVE_BOX_PROMPT_SITE_NAME_FIELD).html(b);
    displayRemoveSiteInfoDialog(jQuery(REMOVE_BOX_PROMPT_DIALOG), "Xóa địa chỉ website", c)
}

function removeMenuSiteById(b) {
    var a = jQuery("#" + b).find("img").attr("alt");
    jQuery(REMOVE_BOX_PROMPT_SITE_ID_FIELD).val(b);
    jQuery(REMOVE_BOX_PROMPT_SITE_NAME_FIELD).html(a);
    displayRemoveSiteInfoDialog(jQuery(REMOVE_BOX_PROMPT_DIALOG), "Xóa địa chỉ website", b)
}

function countActionHandle() {
    countAction++;
    var a = getCookie("_hascntf");
    if (isLogin == "false") {
        if (countAction == 3) {
            showLoginPopup()
        }
    }
}

function showLoginPopup() {
    var b = jQuery("#popup-login");
    var c = jQuery(window).height();
    var a = jQuery(window).width();
    var h = b.width();
    var f = b.height();
    var d = (a - h) / 2;
    var g = (c - f) / 2;
    jQuery("#login-denied-btn").click(function() {
        $("#login_email_label_msg").text(" ");
        jQuery.unblockUI()
    });
    jQuery.blockUI({
        message: jQuery("#popup-login"),
        css: {
            padding: 0,
            margin: 0,
            top: g,
            left: d,
            textAlign: "center",
            width: "auto",
            border: "none",
            cursor: "default",
            backgroundColor: "transparent"
        }
    })
}

function logout() {
    jQuery.ajax({
        async: true,
        type: "POST",
        url: doLogoutURL,
        dataType: "json",
        contenttype: "application/json; charset=utf-8",
        success: function(a) {
            jQuery.blockUI({
                css: {
                    border: "none",
                    padding: "15px",
                    backgroundColor: "#000",
                    "-webkit-border-radius": "10px",
                    "-moz-border-radius": "10px",
                    opacity: 0.5,
                    color: "#fff"
                }
            });
            setTimeout(function() {
                jQuery.unblockUI();
                window.location.href = "http://home.vn/"
            }, 3000)
        },
        error: function(b, c, a) {}
    })
}

function changeicon(b) {
    var a = jQuery(b).attr("icon");
    if (a) {
        jQuery("#image-name").val(a);
        jQuery("div.change-icon-box-prompt-content").find("div.change-icon-box-prompt-item").each(function(c, d) {
            jQuery(d).css("backgroundColor", "")
        });
        jQuery(b).css("backgroundColor", "#a0bd80")
    }
}

function changeiconAdd(b) {
    var a = jQuery(b).attr("icon");
    if (a) {
        jQuery("#iconNameOnAdd").val(a);
        jQuery(".mini-icon img").attr("src", "" + a);
        jQuery(".select-icon-box").hide();
        manualSelectIcon = true
    }
}

function changeIconDialog(b) {
    $("#userIconShow").attr("class", "");
    $("#userIconShow").html("");
    var a = jQuery("#" + b).find("a").attr("href");
    var d = jQuery("#" + b).find("img").attr("alternate");
    if (d.indexOf(DEFAULT_USER_FOLDER) > -1) {
        var f = getHostNameFromURL(a);
        if (checkWWWURL(f)) {
            f = f.replace("www.", "")
        }
        $("#userIconShow").attr("class", "change-icon-box-prompt-item");
        $("#userIconShow").attr("icon", d);
        $("#userIconShow").attr("onclick", "changeicon(this)");
        $("#userIconShow").html("<span class='change-icon-box-prompt-icon-bg'> <img src='" + d + "'title='" + f + "' alt='" + f + "' /></span>")
    }
    var h = jQuery(window).height();
    var c = jQuery(window).width();
    var k = jQuery(CHANGE_BOX_PROMPT_DIALOG).width();
    var j = jQuery(CHANGE_BOX_PROMPT_DIALOG).height();
    var g = (c - k) / 2;
    var i = (h - j) / 2;
    jQuery(CHANGE_BOX_PROMPT_BUTTON_CANCEL).click(function() {
        jQuery.unblockUI()
    });
    jQuery.blockUI({
        message: jQuery(CHANGE_BOX_PROMPT_DIALOG),
        css: {
            padding: 0,
            top: i,
            left: g,
            border: "none",
            cursor: "default",
            backgroundColor: "transparent"
        }
    })
}

function showNotify(b) {
    if (_hascntf != "true") {
        var a = jQuery(b);
        a.show(300);
        jQuery("#close-notify").click(function() {
            a.hide(300);
            isNewUser = false;
            hasChange = false;
            jQuery.cookie("_hascntf", true)
        });
        jQuery("#set-homepage").click(function() {
            var c = detectBrowser();
            if (c == "msie") {
                document.body.style.behavior = "url(#default#homepage)";
                document.body.setHomePage(HOME_PAGE)
            } else {
                alert(c + ": not support set homepage");
                return
            }
        });
        jQuery("#set-bookmark").click(function() {
            var c = detectBrowser();
            if (c == "msie") {
                window.external.AddFavorite(HOME_PAGE, "Home")
            } else {
                if (c == "firefox") {
                    window.sidebar.addPanel(HOME_PAGE, "Home", "")
                } else {
                    alert(c + ": not support set bookmark");
                    return
                }
            }
        })
    }
}

function detectBrowser() {
    var a = navigator.userAgent.toLowerCase();
    if (a.indexOf("firefox") > -1) {
        return "firefox"
    } else {
        if (a.indexOf("opera") > -1) {
            return "opera"
        } else {
            if (a.indexOf("msie") > -1) {
                return "msie"
            } else {
                if (a.indexOf("safari") > -1) {
                    return "webkit"
                } else {
                    return "undefined"
                }
            }
        }
    }
}
jQuery(function() {
    jQuery("#sortable").sortable({
        update: function(c, d) {
            var a = jQuery(this).children();
            var b = $(d.item).children(".item-content").children().attr("href");
            sortAndUpdatePositions(a, 2, b);
            countActionHandle();
            $(d.item).css({
                opacity: "",
                filter: ""
            })
        },
        placeholder: "ui-state-highlight",
        cursor: "pointer",
        opacity: "0.8",
        revert: "300",
        tolerance: "pointer",
        scroll: false,
        refreshPositions: true
    });
    jQuery("#sortable").disableSelection()
});

function getCookie(b) {
    var c = document.cookie;
    var d = c.indexOf(" " + b + "=");
    if (d == -1) {
        d = c.indexOf(b + "=")
    }
    if (d == -1) {
        c = null
    } else {
        d = c.indexOf("=", d) + 1;
        var a = c.indexOf(";", d);
        if (a == -1) {
            a = c.length
        }
        c = unescape(c.substring(d, a))
    }
    return c
}

function focusInputUrl() {
    $("#editBoxPromptDialog").find("#_1_WAR_weblinksportlet_siteUrl").parent().parent().parent().attr("class", "aui-field aui-field-text aui-form-validator-error-container");
    $("#editBoxPromptDialog").find("#_1_WAR_weblinksportlet_siteUrl").before("<label class='aui-form-validator-stack-error' id='aui_3_4_0_1_278'><div class='aui-form-validator-message url' role='alert'>Địa chỉ nhập vào không có</div></label>");
    $("#editBoxPromptDialog").find("#_1_WAR_weblinksportlet_siteUrl").focus()
}

function unfocusInputUrl() {
    $(".aui-form-validator-stack-error").css("display", "none");
    $("#editBoxPromptDialog").find("#_1_WAR_weblinksportlet_siteUrl").parent().parent().parent().attr("class", "aui-field aui-field-text")
}
jQuery(document).ready(function() {
    $("#btnAcceptDesktop").click(function() {
        btnAcceptClick()
    });
    var b;
    $("#sortable li").hover(function() {
        var d = $("#check-show-hdsd").val();
        var f = $("#userLogEditRemove").val();
        if (d == 0 && f == 0) {
            var g = $(this);
            b = setTimeout(function() {
                var h = $(g).attr("id");
                var j = -10 + (Math.floor((Number(h) + 1) / 9)) * 111;
                var i = (((h + 1) % 9) * 110 + 8.5);
                if ((Number(h) + 1) % 9 == 0) {
                    i = 9 * 110 + 8.5;
                    j = -10 + (Math.floor((Number(h)) / 9)) * 111
                }
                $(g).addClass("hdsd-hover");
                $("#image-hdsd").css("left", i + "px");
                $("#image-hdsd").css("top", j + "px");
                $(g).find(".edit-item").attr("style", "display: block;width: 12px;height: 11px;");
                $(g).find(".remove-item").attr("style", "display: block;width: 7px;height: 7px;");
                $("#image-hdsd").show();
                $("#check-show-hdsd").val(1);
                setTimeout(function() {
                    $("#image-hdsd").hide();
                    $(g).removeClass("hdsd-hover");
                    $(g).find(".edit-item").removeAttr("style");
                    $(g).find(".remove-item").removeAttr("style")
                }, 7000)
            }, 1000)
        }
    }, function() {
        clearTimeout(b)
    });
    var a = jQuery("#sortable").children();
    initContextMenu(a);
    $("#closeBoxIcon").click(function() {
        $(".select-icon-box").hide()
    });
    $("#sortable-weblink").mousedown(function() {
        $("#sortable li").removeClass("hover");
        $("#sortable li").removeClass("hoverEdit");
        $("#sortable li").removeClass("hoverRemove");
        $("#sortable li .remove-item1").addClass("remove-item");
        $("#sortable li .remove-item1").removeClass("remove-item1");
        $("#sortable li .edit-item1").addClass("edit-item");
        $("#sortable li .edit-item1").removeClass("edit-item1")
    });
    jQuery(SHOW_BOX_PROMPT_BUTTON).click(function() {
        jQuery("#checkEditAdd").val("3");
        displayEditSiteInfoDialog(jQuery(EDIT_BOX_PROMPT_DIALOG), "Thêm mới địa chỉ website", "")
    });
    jQuery(REMOVE_BOX_PROMPT_BUTTON_ACCEPT).click(function() {
        var h = $(REMOVE_BOX_PROMPT_SITE_ID_FIELD).val();
        var g = $("#" + h).find("a").attr("href");
        deleteTracking(g);
        var d = jQuery("#" + h).closest("li");
        if (d) {
            jQuery(d).remove()
        }
        var f = jQuery("#sortable").children();
        sortAndUpdatePositions(f, 5, g);
        countActionHandle();
        jQuery.unblockUI()
    });

    function c(f) {
        var d = f.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (d != null && d.length > 2 && typeof d[2] === "string" && d[2].length > 0) {
            return d[2]
        } else {
            var g = f.match(/(www[0-9]?\.)?(.[^/:]+)/i);
            if (g != null && g.length > 2 && typeof g[2] === "string" && g[2].length > 0) {
                return g[2]
            } else {
                return null
            }
        }
    }
    jQuery(CHANGE_BOX_PROMPT_BUTTON_ACCEPT).click(function() {
        var g = jQuery("#image-position").val();
        var f = jQuery("#image-name").val();
        if (f.indexOf(DEFAULT_USER_FOLDER) > -1) {
            jQuery("#" + g).find("img").attr("alternate", f);
            jQuery("#" + g).find("img").attr("src", f)
        } else {
            jQuery("#" + g).find("img").attr("alternate", f);
            jQuery("#" + g).find("img").attr("src", DEFAULT_SRC + f)
        }
        var d = jQuery("#sortable").children();
        sortAndUpdatePositions(d, 8);
        jQuery.unblockUI()
    });
    jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD).keydown(function(g) {
        if (g.keyCode == 13) {
            var f = jQuery.trim(jQuery(this).val());
            if (f.length == 0 || f == "http://" || f == "https://") {
                jQuery(this).focus()
            } else {
                var d = jQuery.trim(jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD).val());
                if (d.length == 0) {
                    jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD).focus()
                } else {
                    btnAcceptClick();
                    return false
                }
            }
        } else {
            if (g.keyCode == 9) {} else {
                return
            }
        }
    });
    jQuery(EDIT_BOX_PROMPT_SITE_NAME_FIELD).keydown(function(g) {
        if (g.keyCode == 13) {
            var f = jQuery.trim(jQuery(this).val());
            if (f.length == 0) {
                jQuery(this).focus()
            } else {
                var d = jQuery.trim(jQuery(this).val());
                if (d.length == 0 || d == "http://" || d == "https://") {
                    jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD).focus()
                } else {
                    btnAcceptClick();
                    return false
                }
            }
        } else {
            if (g.keyCode == 9) {}
        }
    });
    jQuery(this).keyup(function(d) {
        if (d.keyCode == 27) {
            jQuery(EDIT_BOX_PROMPT_DIALOG).hide(300)
        }
    })
});
(function(a) {
    a.fn.pajinate = function(d) {
        var k = "current_page";
        var r = "items_per_page";
        var n;
        var m = {
            item_container_id: ".contentVideoOther",
            items_per_page: 10,
            nav_panel_id: ".page_navigation",
            nav_info_id: ".info_text",
            num_page_links_to_display: 20,
            start_page: 0,
            wrap_around: false,
            nav_label_first: "First",
            nav_label_prev: "Prev",
            nav_label_next: "Next",
            nav_label_last: "Last",
            nav_order: ["first", "prev", "num", "next", "last"],
            nav_label_info: "Showing {0}-{1} of {2} results",
            show_first_last: true,
            abort_on_small_lists: false,
            jquery_ui: false,
            jquery_ui_active: "ui-state-highlight",
            jquery_ui_default: "ui-state-default",
            jquery_ui_disabled: "ui-state-disabled"
        };
        var d = a.extend(m, d);
        var o;
        var p;
        var f;
        var h;
        var l;
        var t = d.jquery_ui ? d.jquery_ui_default : "";
        var i = d.jquery_ui ? d.jquery_ui_active : "";
        var v = d.jquery_ui ? d.jquery_ui_disabled : "";
        return this.each(function() {
            p = a(this);
            o = a(this).find(d.item_container_id);
            f = p.find(d.item_container_id).children();
            if (d.abort_on_small_lists && d.items_per_page >= f.size()) {
                return p
            }
            n = p;
            n.data(k, 0);
            n.data(r, d.items_per_page);
            var w = o.children().size();
            var E = Math.ceil(w / d.items_per_page);
            var z = '<span class="ellipse more">...</span>';
            var B = '<span class="ellipse less">...</span>';
            var y = !d.show_first_last ? "" : '<a class="first_link ' + t + '" href="">' + d.nav_label_first + "</a>";
            var D = !d.show_first_last ? "" : '<a class="last_link ' + t + '" href="">' + d.nav_label_last + "</a>";
            var C = "";
            for (var x = 0; x < d.nav_order.length; x++) {
                switch (d.nav_order[x]) {
                    case "first":
                        C += y;
                        break;
                    case "last":
                        C += D;
                        break;
                    case "next":
                        C += '<a class="next_link ' + t + '" href="">' + d.nav_label_next + "</a>";
                        break;
                    case "prev":
                        C += '<a class="previous_link ' + t + '" href="">' + d.nav_label_prev + "</a>";
                        break;
                    case "num":
                        C += B;
                        var A = 0;
                        while (E > A) {
                            C += '<a class="page_link ' + t + '" href="" longdesc="' + A + '">' + (A + 1) + "</a>";
                            A++
                        }
                        C += z;
                        break;
                    default:
                        break
                }
            }
            h = p.find(d.nav_panel_id);
            h.html(C).each(function() {
                a(this).find(".page_link:first").addClass("first");
                a(this).find(".page_link:last").addClass("last")
            });
            h.children(".ellipse").hide();
            h.find(".previous_link").next().next().addClass("active_page " + i);
            f.hide();
            f.slice(0, n.data(r)).show();
            l = p.children(d.nav_panel_id + ":first").children(".page_link").size();
            d.num_page_links_to_display = Math.min(d.num_page_links_to_display, l);
            h.children(".page_link").hide();
            h.each(function() {
                a(this).children(".page_link").slice(0, d.num_page_links_to_display).show()
            });
            p.find(".first_link").click(function(F) {
                F.preventDefault();
                j(a(this), 0);
                s(0)
            });
            p.find(".last_link").click(function(G) {
                G.preventDefault();
                var F = l - 1;
                u(a(this), F);
                s(F)
            });
            p.find(".previous_link").click(function(F) {
                F.preventDefault();
                q(a(this))
            });
            p.find(".next_link").click(function(F) {
                F.preventDefault();
                c(a(this))
            });
            p.find(".page_link").click(function(F) {
                F.preventDefault();
                s(a(this).attr("longdesc"))
            });
            s(parseInt(d.start_page));
            g();
            if (!d.wrap_around) {
                b()
            }
        });

        function q(w) {
            new_page = parseInt(n.data(k)) - 1;
            if (a(w).siblings(".active_page").prev(".page_link").length == true) {
                j(w, new_page);
                s(new_page)
            } else {
                if (d.wrap_around) {
                    s(l - 1)
                }
            }
        }

        function c(w) {
            new_page = parseInt(n.data(k)) + 1;
            if (a(w).siblings(".active_page").next(".page_link").length == true) {
                u(w, new_page);
                s(new_page)
            } else {
                if (d.wrap_around) {
                    s(0)
                }
            }
        }

        function s(y) {
            var z = parseInt(n.data(r));
            var x = false;
            start_from = y * z;
            end_on = start_from + z;
            var w = f.hide().slice(start_from, end_on);
            w.show();
            p.find(d.nav_panel_id).children(".page_link[longdesc=" + y + "]").addClass("active_page " + i).siblings(".active_page").removeClass("active_page " + i);
            n.data(k, y);
            p.find(d.nav_info_id).html(d.nav_label_info.replace("{0}", start_from + 1).replace("{1}", start_from + w.length).replace("{2}", f.length));
            g();
            b()
        }

        function u(z, y) {
            var w = y;
            var x = a(z).siblings(".active_page");
            if (x.siblings(".page_link[longdesc=" + w + "]").css("display") == "none") {
                h.each(function() {
                    a(this).children(".page_link").hide().slice(parseInt(w - d.num_page_links_to_display + 1), w + 1).show()
                })
            }
        }

        function j(z, y) {
            var w = y;
            var x = a(z).siblings(".active_page");
            if (x.siblings(".page_link[longdesc=" + w + "]").css("display") == "none") {
                h.each(function() {
                    a(this).children(".page_link").hide().slice(w, w + parseInt(d.num_page_links_to_display)).show()
                })
            }
        }

        function g() {
            if (!h.children(".page_link:visible").hasClass("last")) {
                h.children(".more").show()
            } else {
                h.children(".more").hide()
            }
            if (!h.children(".page_link:visible").hasClass("first")) {
                h.children(".less").show()
            } else {
                h.children(".less").hide()
            }
        }

        function b() {
            if (h.children(".last").hasClass("active_page")) {
                h.children(".next_link").add(".last_link").addClass("no_more " + v)
            } else {
                h.children(".next_link").add(".last_link").removeClass("no_more " + v)
            }
            if (h.children(".first").hasClass("active_page")) {
                h.children(".previous_link").add(".first_link").addClass("no_more " + v)
            } else {
                h.children(".previous_link").add(".first_link").removeClass("no_more " + v)
            }
        }
    }
})(jQuery);
$(document).ready(function() {
    jQuery(".imgsearch").click(function() {
        searchprod()
    });
    jQuery("#tbxSearch").keypress(function(a) {
        if (a.keyCode == 13) {
            searchprod()
        }
    })
});

function searchprod() {
    var a = jQuery("#tbxSearch").val().trim();
    var b = "/result?q=";
    if ((a == '\u0071') || (jQuery.trim(a) == "")) {
        alert("Nhập từ khóa")
    } else {
        a = Url.encode(a).toLowerCase();
        b += a;
        window.location = b
    }
}
var Url = {
    encode: function(a) {
        return escape(this._utf8_encode(a))
    },
    decode: function(a) {
        return this._utf8_decode(unescape(a))
    },
    _utf8_encode: function(b) {
        b = b.replace(/\r\n/g, "\n");
        var a = "";
        for (var f = 0; f < b.length; f++) {
            var d = b.charCodeAt(f);
            if (d < 128) {
                a += String.fromCharCode(d)
            } else {
                if ((d > 127) && (d < 2048)) {
                    a += String.fromCharCode((d >> 6) | 192);
                    a += String.fromCharCode((d & 63) | 128)
                } else {
                    a += String.fromCharCode((d >> 12) | 224);
                    a += String.fromCharCode(((d >> 6) & 63) | 128);
                    a += String.fromCharCode((d & 63) | 128)
                }
            }
        }
        return a
    },
    _utf8_decode: function(a) {
        var b = "";
        var d = 0;
        var f = c1 = c2 = 0;
        while (d < a.length) {
            f = a.charCodeAt(d);
            if (f < 128) {
                b += String.fromCharCode(f);
                d++
            } else {
                if ((f > 191) && (f < 224)) {
                    c2 = a.charCodeAt(d + 1);
                    b += String.fromCharCode(((f & 31) << 6) | (c2 & 63));
                    d += 2
                } else {
                    c2 = a.charCodeAt(d + 1);
                    c3 = a.charCodeAt(d + 2);
                    b += String.fromCharCode(((f & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    d += 3
                }
            }
        }
        return b
    }
};

function setLen() {
    setCookie("lang", "en", 20 * 365)
}

function setCookie(a, d, b) {
    var f = new Date();
    f.setDate(f.getDate() + b);
    var c = escape(d) + ((b == null) ? "" : "; expires=" + f.toUTCString());
    document.cookie = a + "=" + c
}

function GetURLParameter(a) {
    var d = window.location.search.substring(1);
    var c = d.split("&");
    for (var b = 0; b < c.length; b++) {
        var f = c[b].split("=");
        if (f[0] == a) {
            return f[1]
        }
    }
}
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(f, g, a, i, h) {
        return jQuery.easing[jQuery.easing.def](f, g, a, i, h)
    },
    easeInQuad: function(f, g, a, i, h) {
        return i * (g /= h) * g + a
    },
    easeOutQuad: function(f, g, a, i, h) {
        return -i * (g /= h) * (g - 2) + a
    },
    easeInOutQuad: function(f, g, a, i, h) {
        if ((g /= h / 2) < 1) {
            return i / 2 * g * g + a
        }
        return -i / 2 * ((--g) * (g - 2) - 1) + a
    },
    easeInCubic: function(f, g, a, i, h) {
        return i * (g /= h) * g * g + a
    },
    easeOutCubic: function(f, g, a, i, h) {
        return i * ((g = g / h - 1) * g * g + 1) + a
    },
    easeInOutCubic: function(f, g, a, i, h) {
        if ((g /= h / 2) < 1) {
            return i / 2 * g * g * g + a
        }
        return i / 2 * ((g -= 2) * g * g + 2) + a
    },
    easeInQuart: function(f, g, a, i, h) {
        return i * (g /= h) * g * g * g + a
    },
    easeOutQuart: function(f, g, a, i, h) {
        return -i * ((g = g / h - 1) * g * g * g - 1) + a
    },
    easeInOutQuart: function(f, g, a, i, h) {
        if ((g /= h / 2) < 1) {
            return i / 2 * g * g * g * g + a
        }
        return -i / 2 * ((g -= 2) * g * g * g - 2) + a
    },
    easeInQuint: function(f, g, a, i, h) {
        return i * (g /= h) * g * g * g * g + a
    },
    easeOutQuint: function(f, g, a, i, h) {
        return i * ((g = g / h - 1) * g * g * g * g + 1) + a
    },
    easeInOutQuint: function(f, g, a, i, h) {
        if ((g /= h / 2) < 1) {
            return i / 2 * g * g * g * g * g + a
        }
        return i / 2 * ((g -= 2) * g * g * g * g + 2) + a
    },
    easeInSine: function(f, g, a, i, h) {
        return -i * Math.cos(g / h * (Math.PI / 2)) + i + a
    },
    easeOutSine: function(f, g, a, i, h) {
        return i * Math.sin(g / h * (Math.PI / 2)) + a
    },
    easeInOutSine: function(f, g, a, i, h) {
        return -i / 2 * (Math.cos(Math.PI * g / h) - 1) + a
    },
    easeInExpo: function(f, g, a, i, h) {
        return (g == 0) ? a : i * Math.pow(2, 10 * (g / h - 1)) + a
    },
    easeOutExpo: function(f, g, a, i, h) {
        return (g == h) ? a + i : i * (-Math.pow(2, -10 * g / h) + 1) + a
    },
    easeInOutExpo: function(f, g, a, i, h) {
        if (g == 0) {
            return a
        }
        if (g == h) {
            return a + i
        }
        if ((g /= h / 2) < 1) {
            return i / 2 * Math.pow(2, 10 * (g - 1)) + a
        }
        return i / 2 * (-Math.pow(2, -10 * --g) + 2) + a
    },
    easeInCirc: function(f, g, a, i, h) {
        return -i * (Math.sqrt(1 - (g /= h) * g) - 1) + a
    },
    easeOutCirc: function(f, g, a, i, h) {
        return i * Math.sqrt(1 - (g = g / h - 1) * g) + a
    },
    easeInOutCirc: function(f, g, a, i, h) {
        if ((g /= h / 2) < 1) {
            return -i / 2 * (Math.sqrt(1 - g * g) - 1) + a
        }
        return i / 2 * (Math.sqrt(1 - (g -= 2) * g) + 1) + a
    },
    easeInElastic: function(g, i, f, m, l) {
        var j = 1.70158;
        var k = 0;
        var h = m;
        if (i == 0) {
            return f
        }
        if ((i /= l) == 1) {
            return f + m
        }
        if (!k) {
            k = l * 0.3
        }
        if (h < Math.abs(m)) {
            h = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / h)
        }
        return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
    },
    easeOutElastic: function(g, i, f, m, l) {
        var j = 1.70158;
        var k = 0;
        var h = m;
        if (i == 0) {
            return f
        }
        if ((i /= l) == 1) {
            return f + m
        }
        if (!k) {
            k = l * 0.3
        }
        if (h < Math.abs(m)) {
            h = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / h)
        }
        return h * Math.pow(2, -10 * i) * Math.sin((i * l - j) * (2 * Math.PI) / k) + m + f
    },
    easeInOutElastic: function(g, i, f, m, l) {
        var j = 1.70158;
        var k = 0;
        var h = m;
        if (i == 0) {
            return f
        }
        if ((i /= l / 2) == 2) {
            return f + m
        }
        if (!k) {
            k = l * (0.3 * 1.5)
        }
        if (h < Math.abs(m)) {
            h = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / h)
        }
        if (i < 1) {
            return -0.5 * (h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
        }
        return h * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m + f
    },
    easeInBack: function(f, g, a, j, i, h) {
        if (h == undefined) {
            h = 1.70158
        }
        return j * (g /= i) * g * ((h + 1) * g - h) + a
    },
    easeOutBack: function(f, g, a, j, i, h) {
        if (h == undefined) {
            h = 1.70158
        }
        return j * ((g = g / i - 1) * g * ((h + 1) * g + h) + 1) + a
    },
    easeInOutBack: function(f, g, a, j, i, h) {
        if (h == undefined) {
            h = 1.70158
        }
        if ((g /= i / 2) < 1) {
            return j / 2 * (g * g * (((h *= (1.525)) + 1) * g - h)) + a
        }
        return j / 2 * ((g -= 2) * g * (((h *= (1.525)) + 1) * g + h) + 2) + a
    },
    easeInBounce: function(f, g, a, i, h) {
        return i - jQuery.easing.easeOutBounce(f, h - g, 0, i, h) + a
    },
    easeOutBounce: function(f, g, a, i, h) {
        if ((g /= h) < (1 / 2.75)) {
            return i * (7.5625 * g * g) + a
        } else {
            if (g < (2 / 2.75)) {
                return i * (7.5625 * (g -= (1.5 / 2.75)) * g + 0.75) + a
            } else {
                if (g < (2.5 / 2.75)) {
                    return i * (7.5625 * (g -= (2.25 / 2.75)) * g + 0.9375) + a
                } else {
                    return i * (7.5625 * (g -= (2.625 / 2.75)) * g + 0.984375) + a
                }
            }
        }
    },
    easeInOutBounce: function(f, g, a, i, h) {
        if (g < h / 2) {
            return jQuery.easing.easeInBounce(f, g * 2, 0, i, h) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(f, g * 2 - h, 0, i, h) * 0.5 + i * 0.5 + a
    }
});
var suggestCallBack;
jQuery(document).ready(function() {
    var a = "http://suggestqueries.google.com/complete/search?callback=?";
    jQuery(EDIT_BOX_PROMPT_SITE_URL_FIELD).autocomplete({
        source: function(c, b) {
            jQuery.getJSON(a, {
                hl: "vi",
                jsonp: "suggestCallBack",
                q: c.term,
                client: "hp"
            });
            suggestCallBack = function(f) {
                var d = [];
                jQuery.each(f[1], function(g, j) {
                    if (j != "undefined") {
                        var h = j[0];
                        var i = jQuery("<em>" + j[0] + "</em>").text();
                        d.push({
                            label: j[0],
                            value: i
                        })
                    }
                });
                if (d != "" && d.length > 10) {
                    d.length = 10
                }
                b(d)
            }
        },
        html: "html",
        messages: {
            noResults: "",
            results: function() {}
        },
        select: function(c, d) {
            c.preventDefault();
            var b = d.item;
            jQuery("#_1_WAR_weblinksportlet_siteUrl").val(b.value)
        }
    })
});