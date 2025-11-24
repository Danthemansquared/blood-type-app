import pandas as pd

# 1. Load your Excel
df = pd.read_excel("Tipos_de_Sangre.xlsx")  # make sure path is correct

# 2. Generate JS array
lines = []

for _, row in df.iterrows():
    name = str(row["Nombres"]).replace('"', '\\"')
    bt = str(row["Tipo de Sangre"]).strip()
    lines.append(f'  {{ name: "{name}", bloodType: "{bt}" }},')

js_array = "[\n" + "\n".join(lines) + "\n];"

# 3. Save to a file (optional) or just print
with open("familyMembers.js", "w", encoding="utf-8") as f:
    f.write("export const familyMembers = " + js_array + "\n")

print("export const familyMembers = " + js_array)

