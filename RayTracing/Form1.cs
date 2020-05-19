using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenTK;
using OpenTK.Graphics.OpenGL;
using System.IO;
using System.Windows.Forms;

namespace RayTracing
{
    public partial class Form1 : Form
    {
        View view;

        public Form1()
        {
            InitializeComponent();
            view = new View();
        }

        private void glControl1_Load(object sender, EventArgs e)
        {
            
        }

        private void glControl1_Paint(object sender, PaintEventArgs e)
        {
            view.InitShaders();
            view.DrawQuad();
        }
    }
}
