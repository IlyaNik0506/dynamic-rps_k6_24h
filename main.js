import MIG_1 from './mig_1.js';
import MIG_2 from './mig_2.js';

const preAllocatedVUs = 1;
const maxVUs = 2200;

// Исправленная функция generateStages с использованием target вместо rate
const generateStages = () => [
    { target: 1, duration: '1m'}, // Начальная нагрузка 1 RPS в течение 1 минуты
    { target: 10, duration: '30s'}, // Увеличение до 10 RPS за 30 секунд
    { target: 10, duration: '1m'}, // Поддержание 10 RPS в течение 5 минут
    { target: 1, duration: '30s'}, 
    { target: 1, duration: '3m'} // Снижение до 1 RPS и поддержание этого уровня в течение 3 минут
];

const createScenarioOptions = (startRate, execFunctionName) => ({
    executor: 'ramping-arrival-rate',
    preAllocatedVUs,
    maxVUs,
    timeUnit: '1s',
    gracefulStop: '10s',
    startRate,
    stages: generateStages(),
    exec: execFunctionName,
});

export const options = {
    scenarios: {
        MIG_1: createScenarioOptions(1, 'MIG_1_exec'),
        MIG_2: createScenarioOptions(1, 'MIG_2_exec'),
    },
};

export function MIG_1_exec() {
    MIG_1(); 
}

export function MIG_2_exec() {
    MIG_2(); 
}
