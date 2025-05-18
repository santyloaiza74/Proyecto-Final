import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Gráfico de Torta: Participación de Energías Renovables
# • Descripción: Muestra el porcentaje de cada tipo de energía renovable en el total del
# consumo eléctrico.
# • Datos: share-electricity-renewables, share-electricity-wind, share-electricity-solar, shareelectricity-hydro.
def grafico_torta(output_path):
    # Cargar los archivos CSV    
    df_total = pd.read_csv('./data/04 share-electricity-renewables.csv')
    df_wind = pd.read_csv('./data/11 share-electricity-wind.csv')
    df_solar = pd.read_csv('./data/15 share-electricity-solar.csv')
    df_hydro = pd.read_csv('./data/07 share-electricity-hydro.csv')

    # Asegurar consistencia de columnas
    df_total = df_total.rename(columns={df_total.columns[-1]: 'Renewables'})
    df_wind = df_wind.rename(columns={df_wind.columns[-1]: 'Wind'})
    df_solar = df_solar.rename(columns={df_solar.columns[-1]: 'Solar'})
    df_hydro = df_hydro.rename(columns={df_hydro.columns[-1]: 'Hydro'})

    # Años comunes
    years = sorted(set(df_total['Year']) & set(df_wind['Year']) & set(df_solar['Year']) & set(df_hydro['Year']))
    years = [y for y in years if 1990 <= y <= 2022]  # rango de años animado

    # Inicializar gráfico
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.axis('equal')
    title = ax.text(0, 1.1, '', ha='center', va='center', fontsize=14)

    def get_avg(df, year, col):
        return df[df['Year'] == year][col].mean()

    def update(year):
        ax.clear()
        ax.axis('equal')
        wind = get_avg(df_wind, year, 'Wind')
        solar = get_avg(df_solar, year, 'Solar')
        hydro = get_avg(df_hydro, year, 'Hydro')
        total = get_avg(df_total, year, 'Renewables')
        others = max(0, total - (wind + solar + hydro))

        values = [wind, solar, hydro, others]
        labels = ['Eólica', 'Solar', 'Hidro', 'Otras']
        colors = ['#4f99ff', '#ffc107', '#00c49a', '#8884d8']
        ax.pie(values, labels=labels, autopct='%1.1f%%', colors=colors, startangle=140)
        title.set_text(f'Participación de Energías Renovables ({year})')
        fig.suptitle(f"Año: {year}", fontsize=12)

    ani = FuncAnimation(fig, update, frames=years, repeat=False, interval=700)
    ani.save( output_path + 'grafico_torta_renovables.gif', writer='pillow')
# Gráfico de Barras: Producción de Energía Renovable por Fuente
# • Descripción: Muestra la cantidad de energía producida por cada fuente renovable.
# • Datos: wind-generation, solar-energy-consumption, hydropower-consumption, biofuelproduction, installed-geothermal-capacity.

def grafico_barras_produccion(output_path):
    df_wind = pd.read_csv('./data/08 wind-generation.csv')
    df_solar = pd.read_csv('./data/12 solar-energy-consumption.csv')
    df_hydro = pd.read_csv('./data/05 hydropower-consumption.csv')
    df_bio = pd.read_csv('./data/16 biofuel-production.csv')
    df_geo = pd.read_csv('./data/17 installed-geothermal-capacity.csv')

    df_wind = df_wind.rename(columns={df_wind.columns[-1]: 'Wind'})
    df_solar = df_solar.rename(columns={df_solar.columns[-1]: 'Solar'})
    df_hydro = df_hydro.rename(columns={df_hydro.columns[-1]: 'Hydro'})
    df_bio = df_bio.rename(columns={df_bio.columns[-1]: 'Biofuel'})
    df_geo = df_geo.rename(columns={df_geo.columns[-1]: 'Geothermal'})

    years = sorted(set(df_wind['Year']) & set(df_solar['Year']) & set(df_hydro['Year']) & set(df_bio['Year']) & set(df_geo['Year']))

    fuentes = ['Eólica', 'Solar', 'Hidro', 'Biocomb.', 'Geotérmica']
    colores = ['#4f99ff', '#ffc107', '#00c49a', '#a3d977', '#ff7f50']

    fig, ax = plt.subplots(figsize=(8,6))

    def update(year):
        ax.clear()
        wind = df_wind[df_wind['Year'] == year]['Wind'].mean()
        solar = df_solar[df_solar['Year'] == year]['Solar'].mean()
        hydro = df_hydro[df_hydro['Year'] == year]['Hydro'].mean()
        bio = df_bio[df_bio['Year'] == year]['Biofuel'].mean()
        geo = df_geo[df_geo['Year'] == year]['Geothermal'].mean()
        valores = [wind, solar, hydro, bio, geo]
        ax.bar(fuentes, valores, color=colores)
        ax.set_title(f'Producción de Energía Renovable por Fuente ({year})')
        ax.set_ylabel('Producción (TWh o equivalente)')
        ax.set_ylim(0, max(valores)*1.2 if max(valores) > 0 else 1)

    ani = FuncAnimation(fig, update, frames=years, repeat=False, interval=700)
    ani.save(output_path + 'grafico_barras_renovables.gif', writer='pillow')
    plt.close()

# Gráfico de Líneas: Tendencia en la Capacidad Instalada
# • Descripción: Muestra la evolución de la capacidad instalada de las diferentes fuentes de
# energía renovable a lo largo del tiempo.
# • Datos: cumulative-installed-wind-energy-capacity-gigawatts, installed-solar-PV-capacity,
# installed-geothermal-capacity.

def grafico_lineas_capacidad_instalada(output_path):
    df_wind = pd.read_csv('./data/09 cumulative-installed-wind-energy-capacity-gigawatts.csv')
    df_solar = pd.read_csv('./data/13 installed-solar-PV-capacity.csv')
    df_geo = pd.read_csv('./data/17 installed-geothermal-capacity.csv')

    df_wind = df_wind.rename(columns={df_wind.columns[-1]: 'Wind'})
    df_solar = df_solar.rename(columns={df_solar.columns[-1]: 'Solar'})
    df_geo = df_geo.rename(columns={df_geo.columns[-1]: 'Geothermal'})

    years = sorted(set(df_wind['Year']) & set(df_solar['Year']) & set(df_geo['Year']))

    wind = [df_wind[df_wind['Year'] == y]['Wind'].mean() for y in years]
    solar = [df_solar[df_solar['Year'] == y]['Solar'].mean() for y in years]
    geo = [df_geo[df_geo['Year'] == y]['Geothermal'].mean() for y in years]

    fig, ax = plt.subplots(figsize=(8,6))

    def update(i):
        ax.clear()
        ax.plot(years[:i+1], wind[:i+1], label='Eólica', color='#4f99ff')
        ax.plot(years[:i+1], solar[:i+1], label='Solar', color='#ffc107')
        ax.plot(years[:i+1], geo[:i+1], label='Geotérmica', color='#ff7f50')
        ax.set_title('Tendencia en la Capacidad Instalada de Energías Renovables')
        ax.set_xlabel('Año')
        ax.set_ylabel('Capacidad Instalada (GW)')
        ax.legend()
        ax.set_xlim(min(years), max(years))
        ax.set_ylim(0, max(max(wind), max(solar), max(geo))*1.2 if max(wind+solar+geo) > 0 else 1)

    ani = FuncAnimation(fig, update, frames=len(years), repeat=False, interval=700)
    ani.save(output_path + 'grafico_lineas_capacidad_instalada.gif', writer='pillow')
    plt.close()


# Gráfico de Área: Comparación entre Consumo de Energía Renovable y Convencional
# • Descripción: Compara el consumo de energía renovable con el consumo de energía
# convencional a lo largo del tiempo.
# • Datos: modern-renewable-energy-consumption, datos de consumo de energía
# convencional si están disponibles
# ...existing code...


def grafico_area_consumo(output_path):
    df_ren = pd.read_csv('./data/02 modern-renewable-energy-consumption.csv')
    df_conv = pd.read_csv('./data/03 modern-renewable-prod.csv') # Ajusta el nombre si es diferente

    df_ren = df_ren.rename(columns={df_ren.columns[-1]: 'Renovables'})
    df_conv = df_conv.rename(columns={df_conv.columns[-1]: 'Convencional'})

    years = sorted(set(df_ren['Year']) & set(df_conv['Year']))

    renov = [df_ren[df_ren['Year'] == y]['Renovables'].mean() for y in years]
    conv = [df_conv[df_conv['Year'] == y]['Convencional'].mean() for y in years]

    fig, ax = plt.subplots(figsize=(8,6))

    def update(i):
        ax.clear()
        ax.stackplot(years[:i+1], [renov[:i+1], conv[:i+1]], labels=['Renovable', 'Convencional'], colors=['#00c49a', '#8884d8'])
        ax.set_title('Consumo de Energía Renovable vs Convencional')
        ax.set_xlabel('Año')
        ax.set_ylabel('Consumo (TWh o equivalente)')
        ax.legend(loc='upper left')
        ax.set_xlim(min(years), max(years))
        ax.set_ylim(0, max(max(renov), max(conv))*1.2 if max(renov+conv) > 0 else 1)

    ani = FuncAnimation(fig, update, frames=len(years), repeat=False, interval=700)
    ani.save(output_path + 'grafico_area_consumo.gif', writer='pillow')
    plt.close()

# Llama a estas funciones desde generar_todos_los_graficos:
def generar_todos_los_graficos(output_path):
    grafico_torta(output_path)
    grafico_barras_produccion(output_path)
    grafico_lineas_capacidad_instalada(output_path)
    grafico_area_consumo(output_path)