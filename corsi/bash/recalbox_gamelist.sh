#!/bin/bash
#
# Explain:
# This script refresh the recalbox gamelist with imgs & other details
#
# Install the scraper:
# Install this dependency into your unix/mac
# https://github.com/sselph/scraper
#
# Usage:
# From samba connect to your recalbox /roms & /system
# Launch this bash
# At the end of the bash execute the command written in the terminal from a ssh root@recalbox connection to refresh the gamelist
#
# Some useful scraping parametes if you want to change this bash:
# rom_path used in gamelist.xml: /recalbox/share/roms/%%%/
# rom_dir used by scraper: /Volumes/roms/%%%/
# img_path used in gamelist.xml: ~/.emulationstation/downloaded_images/%%%/
# img_dir used by scraper: /Volumes/system/backup_scrape/downloaded_images/%%%/
#
# =============================================================================
#
# After this refresh was executed do this from ssh root@recalbox_ip:
# /etc/init.d/S31emulationstation stop
# cp -r /recalbox/share/system/backup_scrape/downloaded_images /root/.emulationstation/ && cp -r /recalbox/share/system/backup_scrape/gamelists /root/.emulationstation/
# /etc/init.d/S31emulationstation start

BASE_PATH=${PWD}/gamelists
ROM_PATH=/recalbox/share/roms/
ROM_DIR=/Volumes/roms/
IMG_PATH=/root/.emulationstation/downloaded_images/
IMG_DIR=/Volumes/system/backup_scrape/downloaded_images/
GAMES_FOLDERS=(atari2600 fba gamegear gbc lynx megadrive n64 ngp psx segacd vectrex atari7800 fbalibretro gb gw mame moonlight neogeo pcengine scummvm sg1000 virtualboy cavestory fds gba lutro mastersystem msx nes prboom sega32x snes wswan)

for game_sys in "${GAMES_FOLDERS[@]}"

do
	if [ -d "${ROM_DIR}${game_sys}" ]; then
		# If game directory exists scraper regen directory contents

		echo "----> start ${game_sys} scraping"

		mkdir -p ${BASE_PATH}/${game_sys}
		cd ${BASE_PATH}/${game_sys}
		scraper -rom_path ${ROM_PATH}${game_sys} -rom_dir ${ROM_DIR}${game_sys} -image_path ${IMG_PATH}${game_sys} -image_dir ${IMG_DIR}${game_sys} -refresh

		echo "----> end ${game_sys} scraping"
	else

		echo "${ROM_DIR}${game_sys} not exist"

	fi

done

echo " ---- END SCRAPING ---- "
echo " FROM SSH RESTORE THIS SCAPE WITH FOLLOWING COMMANDS: "
echo " /etc/init.d/S31emulationstation stop"
echo " cp -r /recalbox/share/system/backup_scrape/downloaded_images /root/.emulationstation/ && cp -r /recalbox/share/system/backup_scrape/gamelists /root/.emulationstation/ "
echo " /etc/init.d/S31emulationstation start"

# Example scraping command launch
# scraper -rom_path /recalbox/share/roms/gba/ -rom_dir /Volumes/roms/gba/ -image_dir /Volumes/system/backup_scrape/downloaded_images/gba/ -image_path /root/.emulationstation/downloaded_images/gba/