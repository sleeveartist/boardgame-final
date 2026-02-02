import categories from "./categories";

function getRandomCategory() {
        const randomCategoryObject = categories[Math.floor(Math.random() * categories.length)];
        const theCategory = randomCategoryObject.category;
        const subCategory = randomCategoryObject.subcategories[Math.floor(Math.random() * randomCategoryObject.subcategories.length)];
        return { theCategory, subCategory };
}
const { theCategory, subCategory } = getRandomCategory()

const twoThreeTasks = [
    {
        taskName: "Сколько..?",
        taskDescription: "Ведущий задает вопрос, например: 'Сколько существует профессиональных футбольных клубов?'. Все игроки пытаются угадать число. Кто оказался ближе всех к правильному ответу, забирает все очки. Клубов кстати 3425"
    },
    {
        taskName: "Акинатор",
        taskDescription: "Остальные игроки загадывают человека, у тебя есть 20 закрытых вопросов и 3 минуты, чтобы угадать человека."
    },
    {
        taskName: "Категории",
        taskDescription: "Ты играешь против игрока с наименьшим количеством очков. Ведущий называет категорию, затем идет торг - кто сможет назвать больше слов из этой категории за 30 секунд. Затем ведущий называет подкатегорию победителю торгов, и начинается игра."
    },
    // {
    //     taskName: "Аукцион*",
    //     taskDescription: "По кругу идет аукцион глотков. Когда останется один участник торгов, он должен выпить названное количество глотков, чтобы получить очки."
    // },
    {
        taskName: "Bullshit",
        taskDescription: "Многа букаф"
    },
    {
        taskName: "Ассоциации",
        taskDescription: "Назови любое слово. Все игроки должны по очереди назвать слово, ассоциирующееся с начальным словом. Если игрок замешкался, он выбывает. Игрок, который назвал последнее слово, получает очки."
    },
    {
        taskName: "Сценка",
        taskDescription: "Играешь с игроком с наименьшим количеством очков. Вам дается случайное слово, и ваша задача описать это слово только словами, без телодвижений. Каждый игрок по очереди произносит реплику, состоящую из одного предложения. Задача остальных игроков - угадать слово. Если кто-то угадал слово, очки получает тот, кто произнес последнее предложение, а угадавший получает 1 очко."
    }
]

export default twoThreeTasks