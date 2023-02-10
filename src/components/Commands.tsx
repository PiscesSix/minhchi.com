import React from "react";

export function HelpCommand() : JSX.Element {
    return(
        <div className="output-content">
            <div className="helpCommand">
                <dl>
                <dt>whoami</dt>
                <dd>Một bản tóm tắt về thông tin cá nhân của tôi</dd>
                <dt>projects</dt>
                <dd>Những dự án mà tôi đã làm hoặc tham gia</dd>
                <dt>skills</dt>
                <dd>Những kĩ năng mà tôi có</dd>
                <dt>website</dt>
                <dd>Cách thức tôi làm website này</dd>
                <dt>blog</dt>
                <dd>Nơi tôi chia sẽ những thứ tôi thích</dd>
                <dt>cv</dt>
                <dd>Tải CV</dd>
                <dt>clear</dt>
                <dd>Xoá tất cả đầu ra</dd>
                <dt>all</dt>
                <dd>Hiện ra mọi điều về bản thân tôi</dd>
                <br></br>
                [<span>tab</span>]: Tự hoàn thành câu lệnh <br></br>
                [<span>ctrl+l</span>] = clear
                </dl>
            </div>
        </div>
    )
};

export function WhoamiCommand() : JSX.Element {
    return(
        <div className="whoamiCommand">
            <p>
                Heyy! Cảm ơn vì đã ghé qua web-terminal của tôi ^^. 
                Tôi là MinhChi, đến từ Kon Tum - một vùng đất yên bình 
                và đẹp đến lạ thường ở Tây Nguyên - Việt Nam. 
            </p>
            <p>
                Là sinh viên khoa Toán, yêu triết học, thích máy tính 
                và những điều liên quan tới toán.
            </p>
        </div>
    )
}

export function ProjectCommad() : JSX.Element {
    return(
        <div className="projectCommand">
            :v Tui sẽ public sau nhá
        </div>
    )
}

export function SkillsCommand() : JSX.Element {
    return(
        <div className="skillCommand">
            <div className="box language">
                <span style={{fontSize: "25px", display: "block", marginTop: "10px"}}>Computer: </span>
                <div className="bar">
                    <div className="info">
                        <span>HTML</span>
                    </div>
                    <div className="progress-line html">
                        <span></span>
                    </div>
                </div>
                <div className="bar">
                    <div className="info">
                        <span>CSS</span>
                    </div>
                    <div className="progress-line css">
                        <span></span>
                    </div>
                </div>
                <div className="bar">
                    <div className="info">
                        <span>Python</span>
                    </div>
                    <div className="progress-line python">
                        <span></span>
                    </div>
                </div>
                <div className="bar">
                    <div className="info">
                        <span>Typescript</span>
                    </div>
                    <div className="progress-line typescript">
                        <span></span>
                    </div>
                </div>
                <div className="bar">
                    <div className="info">
                        <span>Matlab</span>
                    </div>
                    <div className="progress-line matlab">
                        <span></span>
                    </div>
                </div>
            </div>

            <div className="box binary">
                <span style={{fontSize: "25px", display: "block", marginTop: "10px"}}>CTF: </span>
                <div className="bar">
                    <div className="info">
                        <span>Pwn</span>
                    </div>
                    <div className="progress-line pwn">
                        <span></span>
                    </div>
                </div>
                <div className="bar">
                    <div className="info">
                        <span>Re</span>
                    </div>
                    <div className="progress-line re">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function WebsiteCommand() : JSX.Element {
    return(
        <div className="websiteCommand">
                <p>
                    Bỗng một ngày đẹp trời của Tết 2023 (:)), tui thấy terminal trên máy mình khá nhàm chán, sao không thử
                    làm gì đó thú vị hơn :). Thế là tui tìm kiếm trên mạng, kết quả cho ra kha khá web kiểu như vậy và tui 
                    thấy web-terminal của anh Craig Feldman khá giống thứ tui cần (Cảm ơn anh vì đã public source code ^^).
                    Mọi người có thể tham khảo web của anh ấy ở đây <a href="https://craigfeldman.com/">craigfeldman.com</a>             
                </p>
                <p>
                    Về cách tổ chức code thì tui đều theo khung code của anh Craig Feldman, tui chỉ thiết kế lại theme bằng
                    css và thêm một vài tính năng mới mà tui nghĩ là nó cần thiết cho người đã dùng quen terminal.
                </p>
                <p>
                    Web-terminal này được xây dựng bằng <strong>React</strong> và <strong>Typescript</strong>. Để chỉnh sửa 
                    và thêm tính năng cho source code thì tui mất 1 tháng để học về <strong>React</strong> và <strong>Typescript</strong>. Đặc
                    biệt là mấy cái chỗ dùng hook :v, xem mãi mới hiểu nó re-render thế nào.
                </p>
        </div>
    )
}

export function BlogCommand() : JSX.Element {
    return(
        <div className="blogCommand">
            Opp!, Đợi thêm tí nhá.
        </div>
    )
}


