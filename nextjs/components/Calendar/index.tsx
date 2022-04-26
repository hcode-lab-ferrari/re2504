const Calendar = () => {

    return (
        <div className="calendar">
            <div className="month">
                <button type="button" className="btn-today">Hoje</button>
                <h2>Junho 2020</h2>
                <nav>
                <button type="button" className="btn-prev">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7.41"
                    height="12"
                    viewBox="0 0 7.41 12"
                    >
                    <path
                        d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z"
                        transform="translate(16 18) rotate(180)"
                        fill="#9a9a99"
                    />
                    </svg>
                </button>
                <button type="button" className="btn-next">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7.41"
                    height="12"
                    viewBox="0 0 7.41 12"
                    >
                    <path
                        d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z"
                        transform="translate(-8.59 -6)"
                        fill="#9a9a99"
                    />
                    </svg>
                </button>
                </nav>
            </div>
            <ul className="weekdays">
                <li>Dom</li>
                <li>Seg</li>
                <li>Ter</li>
                <li>Qua</li>
                <li>Qui</li>
                <li>Sex</li>
                <li>Sáb</li>
            </ul>
            <ul className="days">
                <li className="month-prev">28</li>
                <li className="month-prev">29</li>
                <li className="month-prev">30</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li className="active">23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li>
                <li>29</li>
                <li>30</li>
                <li>31</li>
                <li className="month-next">1</li>
            </ul>
        </div>
    )

};

export default Calendar;