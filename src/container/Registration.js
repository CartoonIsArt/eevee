import React, { Component } from 'react'
import { Alert, Button, Cascader, Checkbox, DatePicker, Form, Icon, Input, LocaleProvider, message, Modal, Upload } from 'antd'
import moment from 'moment'
import koKR from 'antd/lib/locale-provider/ko_KR'
import { request } from '../fetches/request'

const FormItem = Form.Item;

const text1 = '\n' +
    '                          제1조 [명 칭]\n' +
    '                          본 동아리의 정식 명칭은 "광운대학교 만화동아리 C.I.A (Cartoon Is Art) 씨.아이.에이" 이다.\n' +
    '\n' +
    '                          제2조 [목 적]\n' +
    '                          본 동아리는 만화를 좋아하고 관심을 가진 광운대 학생들이 모여, 정보를 교환하고 친목을 도모하며 나아가 대외적으로는 만화문화의 홍보를 목적으로 한다.\n' +
    '\n' +
    '                          제3조 [소 재]\n' +
    '                          본 동아리의 소재는 광운대학교 복지관 523호에 위치한다.\n' +
    '\n' +
    '\n' +
    '                          제2장  회     원\n' +
    '\n' +
    '                          제1절 총     칙\n' +
    '\n' +
    '                          제4조 [회원모집]\n' +
    '                          ① 회원의 모집은 당해년도 학기중 상시가능하다. 단 모집대상은 당해년도 신입학자로 한정한다.\n' +
    '                          ② 동아리에 가입하기 위해서는 15,000원의 가입비를 납부해야한다. 가입비를 납부한 학기의 회비의 잔금 10,000원은 종강총회때 납부한다.\n' +
    '                          ③ 징계의 사유로 탈퇴된 회원을 제외하고 스스로 탈퇴한 회원은 임원진의 찬반투표를 통해 과반수의 찬성시 재가입이 가능하다. 그러나 졸업한 경우에는 가입이 불가능하다.\n' +
    '\n' +
    '                          제2절 준  회  원\n' +
    '\n' +
    '                          제5조 [준회원의 의의]\n' +
    '                          준회원이란 신입 회원 가입서를 작성한 자를 말한다.\n' +
    '\n' +
    '                          제6조 [준회원의 권리]\n' +
    '                          준회원은 회칙에 의하여 제한된 권리 이외에는 정회원과 동일한 권리를 가진다.\n' +
    '\n' +
    '                          제7조 [준회원의 의무]\n' +
    '                          ① 준회원은 회비를 납부해야 한다.\n' +
    '                          ② 준회원은 모든 공식 행사에 참여해야 한다.\n' +
    '\n' +
    '                          제8조 [준희원의 권리제한]\n' +
    '                          준회원은 다음 각 호에 해당하는 권리를 가질 수 없다.\n' +
    '\n' +
    '                          1. 동아리방의 단독 재실권\n' +
    '                          2. 정회원 심사\n' +
    '                          3. 임원 선출\n' +
    '                          4. 회칙의 제정 및 개정\n' +
    '\n' +
    '                          제3절 정회원\n' +
    '\n' +
    '                          제9조 [정회원의 의의]\n' +
    '                          정회원은 준회원에서 정회원 심사를 거쳐서 인정된 자를 말한다.\n' +
    '\n' +
    '                          제10조 [정회원 심사]\n' +
    '                          심사일은 매학기 종강총회로 하며 심사를 하는 자는 정회원, 심사의 대상은 준회원으로 한다. 그 심사의 기준은 의무의 이행여부와 기타 사항으로 한다.\n' +
    '\n' +
    '                          제11조 [정회원의 권리]\n' +
    '                          정회원은 동아리 방의 출입에 대한 모든 권리와 주최하는 모든 회의에서의 의결권을 가진다.\n' +
    '\n' +
    '                          제12조 [정회원의 의무]\n' +
    '                          ① 정회원은 회비를 납부해야 한다.\n' +
    '                          ② 정회원은 모든 공식 행사에 참여해야 한다.\n' +
    '                          ③ 정회원은 동아리의 시설을 점검해야하고 시설에 문제가 있을 경우 보수해야 한다.\n' +
    '                          ④ 정회원 중 4학년 이상인 회원은 2항의 사항을 선택적으로 이행할 수 있다.\n' +
    '\n' +
    '                          제4절 보결회원\n' +
    '\n' +
    '                          제13조 [보결회원의 정의]\n' +
    '                          동아리 회원 중 휴학,자퇴,졸업한 자를 보결회원이라 한다. 단, 재학중이면서 활동인구조사에 참여하지 않은 회원은 보결회원으로 간주한다.\n' +
    '\n' +
    '                          제14조 [권 리]\n' +
    '                          동아리방 재실권에 대해서는 보결회원이 되기 전의 권리에 준용하며, 회의시 의결권은 없다.\n' +
    '\n' +
    '                          제15조 [복 귀]\n' +
    '                          복학 시에는 휴학했을 당시의 등급으로 복귀한다.\n' +
    '\n' +
    '\n' +
    '                          제3장 임      원\n' +
    '\n' +
    '                          제1절 회      장\n' +
    '\n' +
    '                          제16조 [회장의 의의]\n' +
    '                          회장은 동아리를 대내외적으로 대표하는 자를 말한다.\n' +
    '\n' +
    '                          제17조 [회장의 임기]\n' +
    '                          회장의 임기는 1년이며 연임하지 못한다. 임기 이전에 회장의 업무가 지속되지 않을 경우 회의를 통하여 다시 선출한다.\n' +
    '\n' +
    '                          제18조 [회장의 자격요건]\n' +
    '                          회장은 2 학기 이상을 이수하였거나 이수예정인 정회원으로 한다.\n' +
    '\n' +
    '                          제19조 [회장의 선출방법]\n' +
    '                          ① 회장의 선출은 투표를 통해서 하며, 그 시기는 2학기 종강총회로 한다. 궐석일 경우나 부득이한 사정에 의하여 정기회의를 거치지 못한 때에는 임시회의를 통해서 선출토록 한다.\n' +
    '                          ② 서기는 종강총회 7일 전에 회장 후보 추천의 공지를 해야 한다.\n' +
    '                          ③ 회장 후보를 추천하는 자는 종강총회 1일전까지 추천을 해야 한다. 다만 회장 후보를 추천받은 자는 이를 거절할 권리가 있다.\n' +
    '                          ④ 2항과 3항의 절차에 의하여 회장 후보로 추천받지 못 한자는 회장으로 선출될 수 없다. 다만 종강총회에서의 특별한 결정이 있다면 그러지 아니한다.\n' +
    '                          ⑤ 회장은 종강총회에 참석한 정회원의 공개투표에 기한 과반수의 득표로 선출한다. 다만 최고득표자가 과반수의 득표를 받지 못했을 경우 최고득표자를 대상으로 찬반투표를 진행하여 최고득표자가 과반수의 찬성득표를 받았을 경우 회장으로 선출한다.\n' +
    '                          ⑥ 5항에 따라 회장이 선출되지 않을 경우 재투표를 한다.\n' +
    '\n' +
    '                          제20조 [회장의 권한]\n' +
    '                          ① 회장은 동아리 업무에 대한 분담을 명할 수 있다. 또한 그에 따른 업무에 대한 보고를 요청할 수 있다.\n' +
    '                          ② 회장은 회의를 소집할 수 있다.\n' +
    '                          ③ 회장은 부재 시에 임원 중에서 대리인을 선출할 수 있으며, 그 대리인의 권한은 회장에 갈음한다. 단 그 기한은 1달을 넘지 못한다.\n' +
    '                          ④ 3항에도 불구하고 회장이 대리인을 선출하지 않을 경우, 자동적으로 총무가 회장의 권한을 갖는다.\n' +
    '                          ⑤ 회장은 동아리 인터넷 웹 사이트 게시판을 관리할 수 있다.\n' +
    '                          ⑥ 회장은 임기기간동안 회비가 면제된다.\n' +
    '\n' +
    '                          제21조 [회장의 의무]\n' +
    '                          ① 회장은 정해진 임기 동안 업무를 신속정확공명하게 처리해야한다.\n' +
    '                          ② 회장은 동아리를 대외적으로 홍보해야 한다.\n' +
    '                          ③ 회장은 회원을 관리하여야 하며 그 친목을 도모해야 한다.\n' +
    '                          ④ 회장은 지도교수와의 관계유지에 힘써야 한다.\n' +
    '                          ⑤ 회장은 총동아리연합회에서 주최하는 회의에 참석해야 하며, 그 회의의 중요내용을 보고해야한다.\n' +
    '\n' +
    '                          제2절 총      무\n' +
    '\n' +
    '                          제22조 [총무의 의의]\n' +
    '                          총무는 동아리 내의 회계에 대한 사항을 관리하는 자를 말한다. 총무는 부회장의 직위를 겸임한다.\n' +
    '\n' +
    '                          제23조 [총무의 임기]\n' +
    '                          총무의 임기는 1년이며 1학기에 한해 연임할 수 있다. 임기 이전에 총무의 업무가 지속되지 않을 경우 회의를 통하여 다시 선출한다.\n' +
    '\n' +
    '                          제24조 [총무의 자격요건]\n' +
    '                          ① 총무의 자격요건에 관한 규정은 제18조의 규정을 준용한다.\n' +
    '                          ② 총무는 신용이 양호한 자여야 한다.\n' +
    '\n' +
    '                          제25조 [총무의 선출방법]\n' +
    '                          총무의 선출방법에 관한 규정은 제19조의 규정을 준용한다.\n' +
    '\n' +
    '                          제26조 [총무의 권한]\n' +
    '                          ① 총무는 각종 회비 및 경비를 징수할 수 있다.\n' +
    '                          ② 총무는 일정 회수 이상의 회비연체자에 대한 강등을 회의에 상정할 수 있다.\n' +
    '                          ③ 총무는 부재 시에 정회원 중에서 대리인을 선출 할 수 있으며 그 대리인의 권한은 총무에 갈음한다. 단 그 기한은 1달을 넘지 못한다.\n' +
    '\n' +
    '                          제27조 [총무의 의무]\n' +
    '                          ① 총무는 회비의 징수 및 관리의 의무를 갖는다.\n' +
    '                          ② 총무는 1학기마다 회계 내역을 보고해야할 의무를 갖는다.\n' +
    '                          ③ 총무는 기타 행사시의 금전을 관리해야할 의무를 갖는다.\n' +
    '\n' +
    '                          제3절 서      기\n' +
    '\n' +
    '                          제28조 [서기의 의의]\n' +
    '                          서기는 동아리의 기록사항에 대한 책임자이다.\n' +
    '\n' +
    '                          제29조 [서기의 임기]\n' +
    '                          서기의 임기에 관한 규정은 제23조를 준용한다.\n' +
    '\n' +
    '                          제30조 [서기의 자격요건]\n' +
    '                          서기의 자격요건에 관한 규정은 제18조의 규정을 준용한다.\n' +
    '\n' +
    '                          제31조 [서기의 선출방법]\n' +
    '                          서기의 선출방법에 관한 규정은 제19조의 규정을 준용한다.\n' +
    '\n' +
    '                          제32조 [서기의 권한]\n' +
    '                          ① 서기는 게시판을 관리할 수 있다.\n' +
    '                          ② 서기는 대리인을 선출할 수 있으며 그 규정은 제26조 3항을 준용한다.\n' +
    '\n' +
    '                          제33조 [서기의 의무]\n' +
    '                          ① 서기는 회의록을 작성하여야 하며 동아리 내의 공지사항을 알려야 한다.\n' +
    '                          ② 서기는 재정과 관련된 문서를 제외한 동아리 내의 모든 문서를 관리해야 한다.\n' +
    '                          ③ 서기는 회의 출결 사항을 관리해야 한다.\n' +
    '\n' +
    '                          제4절 부장\n' +
    '\n' +
    '                          제34조 [부장의 의의]\n' +
    '                          부장은 동아리의 각종 업무를 분담하는 자를 말한다. 그 업무의 내용은 부칙으로 정한다.\n' +
    '\n' +
    '                          제35조 [부장의 임기]\n' +
    '                          부장의 임기에 관한 규정은 제23조를 준용한다.\n' +
    '\n' +
    '                          제36조 [부장의 자격요건]\n' +
    '                          부장은 1 학기 이상을 이수하였거나 이수예정인 정회원으로 한다.\n' +
    '\n' +
    '                          제37조 [부장의 선출방법]\n' +
    '                          부장의 선출방법에 관한 규정은 제19조의 규정 중 5항과 6항을 준용한다.\n' +
    '\n' +
    '                          제38조 [부장의 권한]\n' +
    '                          ① 부장의 권한과 수는 부칙으로 정한다.\n' +
    '                          ② 부장은 자신의 직무를 수행할 때 임원 및 회원에게 협조를 요구할 수 있다.\n' +
    '                          ③ 부장은 대리인을 선출할 수 있으며 그 규정은 제26조 3항을 준용한다.\n' +
    '\n' +
    '                          제39조 [부장의 의무]\n' +
    '                          부장은 자신의 직무를 성실하게 이행해야 한다.\n' +
    '\n' +
    '                          제5절 자격상실\n' +
    '\n' +
    '                          제40조 [자격상실]\n' +
    '                          ① 임원진이 그의 책임을 다하지 못하거나 소홀히 하였을 경우, 회장은 임원진회의를 통해서 그 자격을 상실할 수 있다. 단 회장이 이에 해당될 경우, 정기회의에 의해서 그 자격을 상실시킨다.\n' +
    '                          또는 활동인구의 1/3이상의 찬성을 통한 발의로 가까운 회의에서 그 자격을 상실할 수 있다.\n' +
    '                          ② 전항에 의하여 생긴 궐석은 회칙에 의해 선출된다. 단, 자격을 상실한 자는 피선출권을 갖지 못한다.\n' +
    '\n' +
    '\n' +
    '                          제4장 회      의\n' +
    '\n' +
    '                          제41조 [정기회의]\n' +
    '                          ① 정기회의는 한달에 한 번, 금요일 오후 6시에 한다.\n' +
    '                          ② 회의에서는 동아리 행사, 부장의 업무보고, 기타 안건을 처리한다\n' +
    '                          ③ 서기는 정기회의의 공지를 회의 7일전에 한다.\n' +
    '                          ④ 정기회의는 활동인구의 1/3 이상이 모인 경우에만 진행할 수 있다.\n' +
    '                          ⑤ 의결을 필요로 하는 안건은 회칙에 특별한 규정이 없는 한, 출석인원의 과반수 이상의 찬성으로 의결한다.\n' +
    '\n' +
    '                          제42조 [비정기회의]\n' +
    '                          ① 비정기회의는 필요에 의해 회장이 소집하거나, 5인 이상의 정회원의 요청에 의한다.\n' +
    '                          ② 회의의 내용은 요청에 따른다.\n' +
    '                          ③ 비정기회의의 공지는 회의결정 후 3일 이내로 하며, 공휴일과 주말은 제외한다.\n' +
    '                          ④ 비정기회의의 성립요건은 제41조 4항의 규정을 준용한다.\n' +
    '                          ⑤ 비정기회의의 안건 의결요건은 제41조 5항의 규정을 준용한다.\n' +
    '\n' +
    '\n' +
    '                          제5장 행      사\n' +
    '\n' +
    '                          제43조 [신입생 홍보]\n' +
    '                          ① 신입생 홍보는 대자보, 오리엔테이션, 네트워크, 부스 및 가두 홍보 등의 방식에 의한다.\n' +
    '                          ② 신입생 홍보 기간은 3월 제1주부터 제3주까지로 한다.\n' +
    '\n' +
    '                          제44조 [정기 축제]\n' +
    '                          ① 대동제 홍보에 관한 규정은 제43조1항의 규정을 준용한다.\n' +
    '                          ② 축제의 업무에 관해서는 회의를 통해서 정한다.\n' +
    '\n' +
    '                          제45조 [정기상영회]\n' +
    '                          ① 상영회는 회의를 통해서 상영작과 시기, 장소 등을 결정한다.\n' +
    '                          ② 동아리 정기상영회는 학기당 1회씩으로 한다.\n' +
    '\n' +
    '                          제46조 [회 지]\n' +
    '                          ① 회지는 짝수 깃수에 1번씩 발간한다.\n' +
    '                          ② 회지는 제작년도의 익년 2월 15일 이전까지 발간토록 한다.\n' +
    '\n' +
    '                          제47조 [MT]\n' +
    '                          MT는 3월에 신입생을 환영하기 위해 간다. 그 외에도 필요한 경우에 한하여 MT를 갈 수 있다.\n' +
    '\n' +
    '                          제48조 [개강, 종강총회]\n' +
    '                          ① 개강총회는 개강 첫 주의 금요일로 한다.\n' +
    '                          ② 종강총회는 해당 학기의 결산을 한다.\n' +
    '                          ③ 개강, 종강총회는 해당월의 정기회의에 갈음해서 진행한다.\n' +
    '\n' +
    '                          제49조 [창립제]\n' +
    '                          창립제는 11월 중에 진행하며, 졸업생 및 재학생의 교류를 목적으로 진행한다.\n' +
    '\n' +
    '\n' +
    '                          제6장 징계\n' +
    '\n' +
    '                          제1절 징계 사항\n' +
    '\n' +
    '                          제50조 [회의불참]\n' +
    '                          정기회의를 한 학기 3회 이상 불참한 자는 종강총회를 통해서 징계의 내용을 결정한다. 징계는 수업, 경조사 등을 이유로 조각 될 수 있다.\n' +
    '\n' +
    '                          제51조 [명예훼손]\n' +
    '                          부적절한 행동을 하여 외부로부터 동아리의 명예를 훼손한 자는 가장 가까운 회의를 통해서 징계의 내용을 결정한다.\n' +
    '\n' +
    '                          제52조 [불화야기자]\n' +
    '                          동아리 내의 불화를 야기하여 동아리의 친목, 기강을 해친 자는 가장 가까운 회의를 통해서 징계의 내용을 결정한다.\n' +
    '\n' +
    '                          제53조 [직무태만]\n' +
    '                          동아리 내에서 주어진 의무를 충실히 이행하지 않은 자는 종강총회를 통해서 징계의 내용을 결정한다.\n' +
    '\n' +
    '                          제54조 [기물파손 및 분실]\n' +
    '                          고의 또는 과실로 기물을 파손하거나 분실했을 경우, 물건 가액을 총무에게 납부하거나, 동일가치의 현물로 배상해야 한다.\n' +
    '\n' +
    '                          제55조 [회비 미납]\n' +
    '                          종강총회까지 회비 미납 금액이 있는 자는 종강 총회를 통해서 징계의 내용을 결정한다.\n' +
    '\n' +
    '                          제56조 [흡연]\n' +
    '                          동아리방, 복지관 내에서 흡연한 자는 1만원의 벌금을 내야한다. 1년에 2회 이상 흡연한 자는 가장 가까운 회의를 통해서 징계의 내용을 결정한다.\n' +
    '\n' +
    '                          제2절 [징계 내용]\n' +
    '\n' +
    '                          제57조 [징계 종류]\n' +
    '                          ① 징계의 종류는 다음 각 호에 따른다.\n' +
    '                          1. 제명\n' +
    '                          2. 강등\n' +
    '                          3. 3만원 이하의 벌금\n' +
    '                          4. 주의\n' +
    '                          ② 제명을 당한 자는 제명을 당한 날로부터 동아리 회원으로서의 일체의 권리를 가질 수 없다.\n' +
    '                          ③ 강등을 당한 자는 강등을 당한 날로부터 준회원이 된다.\n' +
    '                          ④ 2회 주의를 받은 자는 강등 처분을 받는다.\n' +
    '                          ⑤ 3회 주의를 받은 자는 제명 처분을 받는다.\n' +
    '\n' +
    '                          제58조 [징계 절차]\n' +
    '                          ① 징계 안건은 동아리 회원 누구라도 발의할 수 있다. 단 해당 회의의 3일전까지 그 안건을 발의해야한다.\n' +
    '                          ② 징계를 하기 위해서는 징계를 의결하기 3일전에 회장은 징계대상자에게 징계의 대상자임을 통지해야 한다. 이 경우 회장은 징계대상자의 의견을 들어야 한다.\n' +
    '                          ③ 징계는 회의 출석인원의 2/3 이상의 찬성 결정으로 의결한다.\n' +
    '\n' +
    '                          제 7장 동아리 웹사이트\n' +
    '\n' +
    '                          제 1절 의의\n' +
    '\n' +
    '                          \'동아리 웹사이트\'란 본 동아리의 활동을 전산적으로 보조하고, 회원들 간 온라인 친목도모를 위해 만들어진 웹사이트이다.\n' +
    '\n' +
    '                          제 2절 정의\n' +
    '\n' +
    '                          \'동아리 웹사이트\'의 도메인 및 서비스 형태는 \'*인터넷사업부장\'이 지정한다.(*부칙 참조)\n' +
    '\n' +
    '                          제 3절 \'동아리 웹사이트 회원\'\n' +
    '\n' +
    '                          \'동아리 웹사이트 회원\'이란 동아리 웹사이트에 게시된 컨텐츠를 읽거나, 수정하거나, 추가하거나, 삭제할 수 있는 권한이 부여된 동아리 회원이다.\n' +
    '\n' +
    '                          제 4절 게시판 이용촉진에 관한 법률\n' +
    '\n' +
    '                          \'동아리 웹사이트\'에 게시된 모든 컨텐츠에 대하여, 활동인구만 \'비추천\' 의사를 표명할 수 있다.\n' +
    '\n' +
    '                          \'동아리 웹사이트\'에 게시된 컨텐츠의 \'비추천\' 수가 활동인구의 10%를 초과할 경우 해당 컨텐츠는 인터넷사업부 직권 비공개 처리한다.\n' +
    '\n' +
    '                          비공개된 컨텐츠에 대해 컨텐츠 작성자는 가까운 회의에서 이의를 제기할 수 있다.\n' +
    '\n' +
    '                          제 5절 저작권 보호에 관한 면책조항\n' +
    '\n' +
    '                          \'동아리 웹사이트 회원\'이 \'동아리 웹사이트\'에 게시한 저작물을 포함한 모든 컨텐츠에 관한 모든 책임은 해당 컨텐츠를 게시한 \'동아리 웹사이트 회원\'에게 있다.\n' +
    '\n' +
    '                          제8장 기타\n' +
    '\n' +
    '                          제59조 [회칙의 제정 및 개정]\n' +
    '                          ① 정회원 5명 이상은 회칙의 제정 및 개정안을 발의할 수 있다. 단, 회장은 직무이행의 편이성을 고려하여 혼자 발의할 수 있다.\n' +
    '                          ② 회칙의 제정 및 개정안을 발의할 경우 발의자는 회의 일주일 전까지 회칙의 제정 및 개정안을 발의해야하며, 그 이유를 제시하여야 한다.\n' +
    '                          ③ 회칙의 제정 및 개정안은 회의에 출석한 정회원의 2/3이상의 찬성 결정으로 의결한다.\n' +
    '\n' +
    '                          제60조 [보충 규정]\n' +
    '                          회칙에서 규율되지 않은 사항은 회의에서 정한 사항, 동아리의 관습으로 규율한다.\n' +
    '\n' +
    '                          -부칙-\n' +
    '\n' +
    '                          제1조 [시행일]\n' +
    '                          이 회칙은 2015년 12월 18일부터 시행한다.\n' +
    '\n' +
    '                          제2조 [부장]\n' +
    '                          현 동아리의 부장은 사무부장, 홍보부장, 인터넷사업부장으로 구성되어있다.\n' +
    '\n' +
    '                          제3조 [사무부장]\n' +
    '                          사무부장은 동아리 내의 물품, 사무관리 및 청소에 관한 분담을 그 업무로 한다.\n' +
    '\n' +
    '                          제4조 [홍보부장]\n' +
    '                          홍보부장은 동아리의 행사 홍보에 관한 전반적인 내용을 그 업무로 한다.\n' +
    '\n' +
    '                          제5조 [인터넷사업부장]\n' +
    '                          ① 인터넷사업부장은 동아리 온라인 네트워크의 사업 및 관리에 관한 전반적인 내용을 그  업무로 한다.\n' +
    '                          ② 인터넷사업부장은 동아리를 대표하는 웹사이트를 개발, 변경, 관리할 수 있다.\n' +
    '                          ③ 인터넷사업부장은 동아리 웹사이트 및 서버의 최고 권한을 갖는다.\n' +
    '                          ④ 동아리 웹사이트의 ip나 도메인을 변경할 경우, 인터넷사업부장은 이를 지체없이 동아리 활동인구에게 공고한다.\n' +
    '                          ⑤ 웹사이트 개발 및 유지보수 목적으로 사용되는 비용은 회비에서 부담한다.\n' +
    '\n' +
    '                          제6조 [회비]\n' +
    '                          한 학기 회비는 25,000원으로 한다. 단, 종강하기 전까지 납부한다.\n' +
    '\n' +
    '                          제7조 [동아리 출입문 관리]\n' +
    '                          ① 동아리 출입문의 비밀번호 변경은 매 6, 12월에 한다.\n' +
    '                          ② 변경사항은 서기가 전체에게 공지하여야한다.\n' +
    '\n' +
    '                          제8조 [만화책 기증 규정]\n' +
    '                          만화책 기증 시 영구 기증과 일시 기증을 정하여야 한다. 일시 기증은 최소 6개월간 비치하여야 한다.';
const text2 = '\n' +
    '                      정보통신망법 규정에 따라 광운대학교 중앙만화동아리 C.I.A. 웹사이트("C.I.A.")에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.\n' +
    '                      1. 수집하는 개인정보\n' +
    '                      이용자가 활동인구등록, 글 게시 등과 같이 회원제 서비스를 이용하기 위해 회원가입을 할 경우, C.I.A.는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.\n' +
    '                      회원가입 시점에 C.I.A.가 이용자로부터 수집하는 개인정보는 아래와 같습니다.\n' +
    '                      - 회원 가입 시에 ‘아이디, 비밀번호, 이름, 생년월일, 학과(혹은 학부), 학번, 연락처’를 필수항목으로 수집합니다. 만약 이용자가 입력하는 생년월일이 만14세 미만 아동일 경우에는 가입을 거부합니다.\n' +
    '                      서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.\n' +
    '                      C.I.A.내의 개별 서비스 이용, 행사 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.\n' +
    '                      서비스 이용 과정에서 IP 주소, 쿠키, 방문일시·불량 이용 기록 등의 서비스 이용 기록, 기기정보가 생성되어 수집될 수 있습니다.\n' +
    '                      구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 정보통신서비스 제공자가 자동화된 방법으로 생성하여 이를 저장(수집)하거나,\n' +
    '                      2) 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못하도록 안전하게 변환한 후에 수집하는 경우를 의미합니다.\n' +
    '                      2. 수집한 개인정보의 이용\n' +
    '                      C.I.A.는 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.\n' +
    '                      - 회원 가입 의사의 확인, 연령 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.\n' +
    '                      - 콘텐츠 등 기존 서비스 제공에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.\n' +
    '                      - 법령 및 C.I.A.회칙을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.\n' +
    '                      - 동아리 행사 정보 및 참여기회 제공 등 프로모션 목적으로 개인정보를 이용합니다.\n' +
    '                      - 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 등에 개인정보를 이용합니다.\n' +
    '                      - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.\n' +
    '                      3. 개인정보의 파기\n' +
    '                      회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.\n' +
    '                      단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.\n' +
    '                      전자상거래 등에서의 통신비밀보호법 등 법령에서 일정기간 정보의 보관을 규정하는 경우는 아래와 같습니다. C.I.A.는 이 기간 동안 법령의 규정에 따라 개인정보를 보관하며, 본 정보를 다른 목적으로는 절대 이용하지 않습니다.\n' +
    '                      - 통신비밀보호법\n' +
    '                      로그인 기록: 3개월';
const options = [];
const args = [];
function init() {
  for (let i = 1; i <= moment().get('year') - 1998; i += 1) {
    options.push({ value: i, label: `${i}기` });
  }
}
init();


function beforeUpload(file) {
  const isImage = file.type === 'image/gif' ||
                  file.type === 'image/png' ||
                  file.type === 'image/jpeg' ||
                  file.type === 'image/bmp' ||
                  file.type === 'image/webp';
  if (!isImage) {
    message.error('이미지만 업로드 해주세요!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('10MB 넘으면 안되요!');
  }
  return isImage && isLt10M;
}

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      agreeLaw: false,
      agreeTerms: false,
      agreeAll: false,
      userName: '',
      nTh: '',
      birthday: '',
      id: '',
      password: '',
      passwordCheck: '',
      major: '',
      number: '',
      email: '',
      phoneNumber: '',
      title: '',
      character: '',
      profile: 'https://pbs.twimg.com/media/DLJeodaVoAAIkUU.jpg',
      previewVisible: false,
      fileList: [],
    };
  }
  onChangeInput(e) {
    this.setState(e);
  }
  onNumberChange(value, selectedOptions) {
    console.log(value, selectedOptions);
    this.setState({ nTh: selectedOptions });
  }
  onDateChange(date, dateString) {
    console.log(date, dateString);
    this.setState({ birthday: dateString });
  }
  onButtonClicked() {
    if (this.isEmpty()) {
      Modal.warning({ title: '다시 확인해주세요!', content: '입력하지 않은 필수 항목이 있습니다.' });
      return;
    } else if (this.state.password !== this.state.passwordCheck) {
      Modal.warning({ title: '비밀번호를 확인해주세요!', content: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    console.log(this.state);
    args.push({ type: 'String', key: 'fullname', value: this.state.userName })
    args.push({ type: 'Number', key: 'nTh', value: this.state.nTh[0].value })
    args.push({ type: 'String', key: 'dateOfBirth', value: this.state.birthday })
    args.push({ type: 'String', key: 'username', value: this.state.id })
    args.push({ type: 'String', key: 'password', value: this.state.password })
    args.push({ type: 'String', key: 'department', value: this.state.major })
    args.push({ type: 'Number', key: 'studentNumber', value: this.state.number })
    // args.push({ type: 'String', key: 'email', value: this.state.email })
    args.push({ type: 'String', key: 'phoneNumber', value: this.state.phoneNumber })
    args.push({ type: 'String', key: 'favoriteComic', value: this.state.title })
    args.push({ type: 'String', key: 'favoriteCharacter', value: this.state.character })
    if (this.state.fileList.length < 1) {
      args.push({ type: 'String', key: 'profileImage', value: 'default' })
    } else {
      args.push({ type: 'String', key: 'profileImage', value: this.state.fileList[0].name })
    }
    request('POST', 'users', args)
    Modal.success({
      title: '가입 신청이 완료되었습니다!',
      content: '오늘 안으로 가입 승인이 완료될 거에요.',
      onOk() { location.href = '/login' },
    });
  }
  isEmpty() {
    if (this.state.userName &&
          this.state.nTh &&
          this.state.birthday &&
          this.state.id &&
          this.state.password &&
          this.state.major &&
          this.state.number &&
          this.state.email &&
          this.state.phoneNumber
        ) { return false; }
    return true;
  }
  handleCancelProfile() {
    this.setState({ previewVisible: false })
  }
  handlePreview(file) {
    this.setState({
      profile: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange({ fileList }) {
    this.setState({ fileList })
  }

  render() {
    const { userName, id, password, passwordCheck, major,
        number, email, phoneNumber, title, character,
        fileList, previewVisible, profile,
        agreeLaw, agreeTerms } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div><p> 업로드 </p></div>
      </div>
      );

    return (
      <LocaleProvider locale={koKR}>
        {
            this.state.agreeAll ?
              <div style={{ width: '1280px' }} /* 전체 div */ >
                <div style={{ display: 'flex', marginLeft: '220px' }} /* 왼쪽 div */ >
                  <div style={{ width: '512px', marginRight: '40px' }}>
                    <div
                      style={{ display: 'flex', marginBottom: '20px' }}
                    >
                      <div style={{
                        width: '512px',
                        height: '80px',
                        padding: '10px',
                        paddingLeft: '32px',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                      }}
                      > CIA 회원가입
                      </div>
                    </div>
                    <img
                      src="https://static.zerochan.net/Roa.%28Onoue.Ren%29.full.2177663.jpg"
                      alt="가로로 긴 그림"
                      style={{ width: '512px', overflow: 'hidden' }}
                    />
                  </div>
                  <div style={{ width: '288px', marginTop: '20px' }} /* 오른쪽 div */ >
                    <Alert message="* 부분은 필수 입력사항입니다" type="warning" />
                    <Form style={{ marginTop: '20px' }}>
                      <FormItem label="프로필 사진">
                        <div style={{ marginTop: '8px' }}>
                          <div>
                            <Upload
                              action="//jsonplaceholder.typicode.com/posts/"  // 실제로 작동하게
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={e => this.handlePreview(e)}
                              onChange={e => this.handleChange(e)}
                              beforeUpload={e => beforeUpload(e)}
                            >
                              {fileList.length ? null : uploadButton}
                            </Upload>
                            <Modal
                              visible={previewVisible}
                              footer={null}
                              onCancel={() => this.handleCancelProfile()}
                            >
                              <img
                                alt="프로필 이미지"
                                style={{ width: '100%' }}
                                src={profile}
                              />
                            </Modal>
                          </div>
                        </div>
                      </FormItem>
                    </Form>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                      <Input
                        addonBefore="*이름"
                        size="large"
                        style={{ width: '288px', marginRight: '20px' }}
                        onChange={e => this.onChangeInput({ userName: e.target.value })}
                        value={userName}
                      />
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div>
                        <Cascader
                          style={{ width: '140px', marginRight: '8px' }}
                          options={options}
                          size="large"
                          onChange={(value, option) => this.onNumberChange(value, option)}
                          placeholder="*기수를 선택하세요"
                          showSearch
                        />
                        <DatePicker
                          style={{ width: '140px' }}
                          size="large"
                          onChange={(date, dateString) => this.onDateChange(date, dateString)}
                          placeholder="*생일을 선택하세요"
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                      <Input
                        addonBefore="*아이디"
                        size="large"
                        style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                        onChange={e => this.onChangeInput({ id: e.target.value })}
                        value={id}
                      />
                      <Input
                        addonBefore="*비밀번호"
                        type="password"
                        size="large"
                        style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                        onChange={e => this.onChangeInput({ password: e.target.value })}
                        value={password}
                      />
                      <Input
                        addonBefore="*비밀번호 확인"
                        type="password"
                        size="large"
                        style={{ width: '288px' }}
                        onChange={e => this.onChangeInput({ passwordCheck: e.target.value })}
                        value={passwordCheck}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                      <Input
                        addonBefore="*학과(학부)"
                        size="large"
                        style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                        onChange={e => this.onChangeInput({ major: e.target.value })}
                        placeholder="ex) 컴퓨터정보공학부"
                        value={major}
                      />
                      <Input
                        addonBefore="*학번"
                        size="large"
                        style={{ width: '288px' }}
                        onChange={e => this.onChangeInput({ number: e.target.value })}
                        placeholder="ex) 2017000000"
                        value={number}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                      <Input
                        addonBefore="*이메일"
                        size="large"
                        style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                        onChange={e => this.onChangeInput({ email: e.target.value })}
                        placeholder="ex) example@example.com"
                        value={email}
                      />
                      <Input
                        addonBefore="*핸드폰(010-)"
                        size="large"
                        style={{ width: '288px' }}
                        onChange={e => this.onChangeInput({ phoneNumber: e.target.value })}
                        placeholder="ex) 1234-5678"
                        value={phoneNumber}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '288px', display: 'flex', flexDirection: 'column' }}>
                          <Input
                            addonBefore="만화"
                            size="large"
                            style={{ width: '288px', marginBottom: '8px' }}
                            onChange={e => this.onChangeInput({ title: e.target.value })}
                            placeholder="ex) 하이큐"
                            value={title}
                          />
                          <Input
                            addonBefore="캐릭터"
                            size="large"
                            style={{ width: '288px', marginBottom: '20px' }}
                            onChange={e => this.onChangeInput({ character: e.target.value })}
                            placeholder="ex) 카게야마 토비오"
                            value={character}
                          />
                          <Button
                            size="large"
                            type="primary"
                            onClick={() => this.onButtonClicked()}
                          >
                            환영해요!
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            :
              <div
                className="agree"
                style={{ margin: '8px 0 8px 0', padding: '12px', backgroundColor: '#ffffff' }}
              >
                <div
                  className="agree-box"
                  style={{
                    padding: '12px',
                    border: '1.5px solid black',
                    borderRadius: '10px',
                  }}
                >
                  <Checkbox
                    style={{ fontSize: '20px', fontWeight: 'bold' }}
                    checked={this.state.agreeLaw}
                    onChange={() => this.setState({ agreeLaw: (!agreeLaw) })}
                    className="pt-large"
                  > C.I.A. 회칙 동의(필수)
                  </Checkbox>
                  <div
                    className="agree-text"
                    style={{
                      wordWrap: 'break-word',
                      whiteSpace: 'pre-line',
                      overflowY: 'scroll',
                      height: '200px' }}
                  >
                    {text1}
                  </div>
                </div>
                <div
                  className="agree-box"
                  style={{
                    padding: '12px',
                    border: '1.5px solid black',
                    borderRadius: '10px',
                    marginTop: '20px',
                  }}
                >
                  <Checkbox
                    style={{ fontSize: '20px', fontWeight: 'bold' }}
                    checked={this.state.agreeTerms}
                    onChange={() => this.setState({ agreeTerms: (!agreeTerms) })}
                    className="pt-large"
                  > 개인정보 수집 및 이용에 대한 안내(필수)
                  </Checkbox>
                  <div className="agree-text">
                    <div style={{
                      wordWrap: 'break-word',
                      whiteSpace: 'pre-line',
                      overflowY: 'scroll',
                      height: '200px' }}
                    >
                      {text2}
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  className="pt-button pt-intent-success float-right"
                  style={{ marginTop: '20px' }}
                  onClick={() => this.state.agreeLaw &&
                                 this.state.agreeTerms &&
                                 this.setState({ agreeAll: true }) &&
                                console.log(this.state.agreeAll)}
                  disabled={!(this.state.agreeLaw && this.state.agreeTerms)}
                >
                동의합니다
                <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
                </Button>
              </div>
        }
      </LocaleProvider>
    )
  }
}

export default Registration
