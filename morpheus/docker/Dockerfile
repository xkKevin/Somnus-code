FROM xkkevin/morpheus:v1
#FROM grimkirill/r-python:0.0.5

#RUN rm -rf /etc/apt/sources.list.d/*.list \
#    && sed -i "s@http://deb.debian.org/debian@http://mirrors.aliyun.com/debian@g" /etc/apt/sources.list \
#    && apt update \
#    && apt -y install python3 python3-pip psmisc
#RUN R -e "install.packages('dplyr',dependencies=TRUE, repos='https://mirrors.sjtug.sjtu.edu.cn/cran/')"
#RUN R -e "install.packages('tidyr',dependencies=TRUE, repos='https://mirrors.sjtug.sjtu.edu.cn/cran/')"
#RUN R -e "install.packages('devtools',dependencies=TRUE, repos='https://mirrors.sjtug.sjtu.edu.cn/cran/')"
#RUN R -e "install.packages('Rcpp',dependencies=TRUE, repos='https://mirrors.sjtug.sjtu.edu.cn/cran/')"
#RUN R -e "install.packages('RInside',dependencies=TRUE, repos='https://mirrors.sjtug.sjtu.edu.cn/cran/')"
#RUN R -e "install.packages('compare',dependencies=TRUE, repos='https://mirrors.sjtug.sjtu.edu.cn/cran/')"
#
#COPY dist/bin/lockfile /usr/bin/lockfile
#RUN chmod u+x /usr/bin/lockfile
#ADD dist/lib/ae-pldi17-morpheus.tar.gz /app/ae-pldi17-morpheus
#RUN ln -s /app/ae-pldi17-morpheus /app/morpheus
COPY dist/requirements.txt /tmp/requirements.txt
RUN pip3 install -i http://mirrors.aliyun.com/pypi/simple -r /tmp/requirements.txt --trusted-host mirrors.aliyun.com

WORKDIR /root/morpheus/
COPY dist/src/ /root/morpheus/

CMD ["python", "useMorpheus.py"]
