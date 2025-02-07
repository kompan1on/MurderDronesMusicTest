import os

# Путь к папке с треками
music_folder = "Music"

# Получаем все файлы в папке
music_files = os.listdir(music_folder)

# Читаем содержимое файла script.js
with open("script.js", "r", encoding="utf-8") as js_file:
    lines = js_file.readlines()

# Находим индекс строки, где нужно вставить или заменить массив audios
insert_index = 31  # Индекс строки, на которой будет начинаться или заменяться массив audios

# Удаляем старый массив audios, если он уже существует
new_lines = []
inside_audios = False
for i, line in enumerate(lines):
    if "let audios = [" in line:
        inside_audios = True
    elif inside_audios and "]" in line:
        inside_audios = False
        new_lines.append("let audios = [\n")
        for file_name in music_files:
            new_lines.append(f'    "Music/{file_name}",\n')
    if not inside_audios:
        new_lines.append(line)

# Добавляем или заменяем массив audios в файл script.js на строке 32
with open("script.js", "w", encoding="utf-8") as js_file:
    js_file.writelines(new_lines)




# import os

# # Путь к папке с треками
# music_folder = "Music"

# # Получаем все файлы в папке
# music_files = os.listdir(music_folder)

# # Создаем JavaScript-файл и записываем туда массив с путями к файлам
with open("music_tracks.js", "w", encoding="utf-8") as js_file:
    js_file.write("let audios = [\n")
    js_file.write(",\n".join([f'    "Music/{file_name}"' for file_name in music_files]))
    js_file.write("\n];\n")
    js_file.write("export { audios };")



# import os

# # Путь к папке с треками
# music_folder = "Music"

# # Получаем все файлы в папке
# music_files = os.listdir(music_folder)

# # Создаем JavaScript-файл и записываем туда массив с именами файлов
# with open("music_tracks.js", "w", encoding="utf-8") as js_file:
#     js_file.write("let musicTracks = [\n")
#     for file_name in music_files:
#         js_file.write(f'    {'"Music/{file_name}"'},\n')
#     js_file.write("]; \n")
#     js_file.write("export { musicTracks };")


    # with open("music_tracks.js", "w", encoding="utf-8") as js_file:
    # js_file.write("let musicTracks = [\n")
    # for file_name in music_files:
    #     js_file.write(f'    {{"name": "{file_name}", "path": "Music/{file_name}"}},\n')
    # js_file.write("];")