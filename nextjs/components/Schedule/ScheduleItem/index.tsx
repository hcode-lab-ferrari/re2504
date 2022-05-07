import axios from "axios";
import { format } from "date-fns";
import { Schedule } from "../../../types/Schedule";
import { formatCurrency } from "../../../utils/formatCurrency";

type ScheduleItemProps = {
    schedule: Schedule;
    token: string;
    onCanceled?: () => void;
}

const ScheduleItem = ({ schedule, token, onCanceled }: ScheduleItemProps) => {

    const onClickCancel = () => {

        if (confirm('Deseja cancelar o agendamento?')) {
            axios.delete(`/schedules/${schedule.id}`, {
                baseURL: process.env.API_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(() => {
                if (typeof onCanceled === 'function') {
                    onCanceled();
                }
            }).catch(() => alert('Erro ao cancelar agendamento.'));
        }

    }

    return <li>
        <section>
            <div>
                <label>Data</label>
                <span>{format(new Date(schedule.scheduleAt), "dd/MM/yyyy 'às' HH:mm")}</span>
            </div>
            <div>
                <label>Status</label>
                <span>{schedule.paymentSituation?.name}</span>
            </div>
            <div>
                <label>Valor</label>
                <span>{formatCurrency(Number(schedule.total))}</span>
            </div>
            <div className="service">
                <label>Serviço</label>
                <span>{schedule.ScheduleService?.map((ss => ss.service?.name)).join(', ')}</span>
            </div>
        </section>
        {new Date(schedule.scheduleAt).getTime() > new Date().getTime() && <button type="button" className="cancel" onClick={onClickCancel}>Cancelar</button>}
    </li>
}

export default ScheduleItem;