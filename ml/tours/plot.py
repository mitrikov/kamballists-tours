import matplotlib.pyplot as plt
import numpy as np


np.random.seed(28310)

# x = list(np.round(np.random.normal(300, 20, 1000)))
# y = list(np.round(np.random.normal(160, 20, 1000)))

y = list([100, 80, 50, 40, 30, 23, 14, 5])
x = list(["12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00"])
# plt.title("Зависимость пользователей от предпочтений")
# plt.xlabel("Возраст")
# plt.ylabel("Спортивные туры")

plt.title("Вероятность того, что я пойду в ГТА")
plt.ylabel("Вероятность")
plt.xlabel("Время")

plt.plot(x, y)
# plt.scatter(x, y, alpha=0.5)
plt.show()
