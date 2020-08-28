/////////////전역변수////////////////////////////
var pno = 0;
const totnum = 6;
var psts = 0;
var winH = $(window).height() - 80; //화면높이값
/////////////////////////////////////////////////////

/* var pos1;
 $(window).scroll(function() {
     var scTop = $(this).scrollTop();
     console.log("스크롤:" + scTop);
 }); //////////// scroll //////////////*/

$(function () { ///// jQB //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /// 메뉴마우스들어갈때 ///
    $(".main_lnb_ul").hover(
        function () { // over
            $(".top").addClass("on");
        },
        function () { // out
            $(".top").removeClass("on");
        });

/////////////////////////////////////////////////////////////////////////////////ban//////////////////////////////
    //위치값 셋팅
    pos2 = $("#ban").offset().top;
    console.log("첫번째위치:" + pos2);
    
    $(".ban_list>li").animate({
        left:"-100%"
    },400);
    
    
    
    /// 오른쪽버튼 이동하기
    $(".mbtnL").click(function () {
        $(".ban_list").animate({
            left: "-100%"
        }, 400,"easeOutQuint", function () {
            $(this).append($("li", this).first())
                .css({
                    left: "0"
                });
        });
    }); //////// click //////////////

    /// 왼쪽버튼 이동하기
    $(".mbtnR").click(function () {
        $(".ban_list").prepend($(".ban_list>li").last())
            .css({
                left: "-100%"
            });
        $(".mlst").animate({
            left: "0"
        }, 400,"easeOutQuint");
    }); //////// click //////////////

   /////////////////////////////////////////////////////////////////////////////////////biz//////////////////// 
    /// 사업영역 오른쪽버튼 이동하기
   pos3 = $(".btn_biz").offset().top;
    console.log("첫번째위치:" + pos3);

    $(".arrowR").click(function () {
        $(".bizBox").animate({
            left: "-50%"
        }, 400, function () {
            $(this).append($("li", this).first())
                .css({
                    left: "0"
                });
        });
    }); //////// click //////////////



    /// 왼쪽버튼 이동하기
    $(".arrowL").click(function () {
         $(".bizBox").prepend($(".bizBox>li").last())
            .css({
                left: "-50%"
            });
        $(".mlst").animate({
            left: "0"
        }, 400,"easeOutQuint");
    }); //////// click //////////////
    
/////////////////////////////////////////////////////////////////////////////////media/////////////////////////////
    /// 미디어 오른쪽버튼 이동하기
    pos1 = $(".cont_1").offset().top;
    console.log("첫번째위치:" + pos1);

    $(".mbtnR").click(function () {
        $(".mlst").animate({
            left: "-25%"
        }, 400, function () {
            $(this).append($("li", this).first())
                .css({
                    left: "0"
                });
        });
    }); //////// click //////////////



    /// 왼쪽버튼 이동하기
    $(".mbtnL").click(function () {
         $(".mlst").prepend($(".mlst>li").last())
            .css({
                left: "-25%"
            });
        $(".mlst").animate({
            left: "0"
        }, 400,"easeOutQuint");
    }); //////// click //////////////
    
    
    /// 임시로 인재채용 클릭시 등장 ////
    $(".cont_4").click(function () {
        $(".saram").each(function (idx, ele) {
            //idx순번, ele요소자신(this)
            //console.log(idx);
            $(ele).delay(400 * idx)
                .animate({
                    top: "0"
                }, 400);


        }); ////////// each ////////////


    }); /////////// click /////////////////

    /***************************************************************************
    마우스 휠 및 페이지 변환        
    ****************************************************************************/
    $(document).on("mousewheel DOMMouseScroll",
        function (e) {

            ///////////광스크롤막기//////////////////////
            if (psts === 1) return true; //돌아가!!
            psts = 1; //잠금 (기존 0 값을 변경)
            setTimeout(function () {
                psts = 0
            }, 600); /////타임아웃/////////////
            ///////////////////////////////////////
            console.log("휠~~");
            e = window.event || e;
            var delta = e.detail ? e.detail : e.wheelDelta;
            console.log("델타값:" + delta);
            if (delta < 0) {
                pno++; //1씩증가
                //한계페이지 번호 마지막 번호에 고정!
                if (pno === totnum) pno = totnum - 1;
            } //////if////
            else {
                pno--; //1씩 감소
                //한계페이지번호 첫 번호에 고정!
                if (pno === -1) pno = 0;
            } /////else/////
            console.log("페이지번호:" + pno);


            $("html,body").stop().animate({
                scrollTop: (pno * winH) + "px"
            }, 600, "easeInOutSine", function () {
                //페이지액션 함수 호출
                pageAction();
            }) /////anmate/////
            chgMenu();

        }); ///////mousewheel////////////////////////////////////////////////////////////////////////////////

    //GNB a 링크를 클릭하면 해당 페이지 위치로 이동 애니메이션
    //이벤트 대상:#gnb a
    $("#bnavi a").click(function (e) {
        //1. a테그 기본이동 막기
        e.preventDefault();

        //클릭된 순번 알아오기
        var idx = $(this).parent().index(); //li의 순법
        console.log("클릭된 순번:" + idx);
        //전역 페이지번호에 idx일치시키기
        pno = idx; //메뉴변경 함수를 위해 전역변수에 일치!

        //2. a테그에 href값 읽어오기 (이동할 페이지 아이디값)
        var pid = $(this).attr("href");
        console.log("아이디:" + pid);

        $("html,body").animate({
            scrollTop: (pno * winH) + "px"
        }, 600, "easeInOutSine", function () {
            //페이지액션 함수 호출
            pageAction();
        }) /////anmate/////
        chgMenu();
    }); /////////click//////

}); ////jQB///////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*/////////////////////////////////////////////////////////////
    함수명:chgMenu
    기능: GNB메뉴와 블릿메뉴 현재 에이지에 맞게 변경하기
*/ //////////////////////////////////////////////////////////////
function chgMenu() {
    //페이지 번호 pno에 해당하는 메뉴만 class넣기

    $("#bnavi a").eq(pno).parent() //선택된 a dythdml qnah li를 선택
        .addClass("on") //클래스on넣기
        .siblings(0) // 선택된 li외의 다른 모두선택!
        .removeClass("on"); //모두 클래스 "on"지우기

} //////////함수명(chgMenu)//////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*//////////////////////////////////////////////
    함수명: pageAction
    기능: 페이지 이동시 액션 보이기
*/ //////////////////////////////////////////////
function pageAction() {

    if (pno === 4) {
        $(".saram").each(function (idx, ele) {
            //idx순번, ele요소자신(this)
            //console.log(idx);
            $(ele).delay(400 * idx)
                .animate({
                    top: "0"
                }, 400);


        }); ////////// each ////////////

    } //// if /////

} ////// pageAction 함수 //////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
